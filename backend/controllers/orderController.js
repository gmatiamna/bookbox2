const Order = require('../models/Order');
const Offer = require('../models/Offer');
const User = require('../models/User');
const Book = require('../models/Book');
const Cart = require('../models/Cart');  // or wherever your Cart model is defined

const { createNotification } = require('../controllers/orderNotificationController');
const { updateUserLibrary } = require('./userlibraryController');
const { supabase } = require('../supabase/supabaseClient');
const UserSubscription = require("../models/UserSubscription");

const rentBookWithSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    const now = new Date();

    // ✅ Check if user has an active subscription
    const activeSub = await UserSubscription.findOne({
      user: userId,
      status: "active",
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    if (!activeSub) {
      return res.status(403).json({ message: "No active subscription found" });
    }

    // ✅ Check if already rented
    const alreadyRented = await Order.findOne({
      user: userId,
      book: bookId,
      type: "location",
      location_fin: { $gte: now }, // still active
    });

    if (alreadyRented) {
      return res.status(400).json({ message: "Book already rented" });
    }

    const locationStart = now;
    const locationEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 2 weeks default rental period

    const order = new Order({
      user: userId,
      book: bookId,
      type: "location",
      location_debut: locationStart,
      location_fin: locationEnd,
    });

    await order.save();

    res.status(201).json({ message: "Book rented successfully", order });
  } catch (err) {
    console.error("Error renting book with subscription:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📦 Create a new order (buy/rent a book)
const createOrder = async (req, res) => {
  try {
    const { books } = req.body;
    const userId = req.user._id;

    if (!books || !Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ message: "No books provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const createdOrders = [];

    for (const b of books) {
      console.log("📦 Incoming order request body:", req.body);

      const { book: bookId, type, price, location_debut, location_fin } = b;

      const book = await Book.findById(bookId);
      if (!book) continue; // skip invalid books

      let finalPrice = price;

      // apply discount if any
      if (user.claimedOffer) {
        const offer = user.claimedOffer;
        finalPrice = price - (price * (offer.discountPercentage / 100));
        finalPrice = Math.max(finalPrice, 0);
      }

      const order = new Order({
        user: userId,
        book: bookId,
        type,
        prix: finalPrice,
        location_debut: type === 'location' ? location_debut : undefined,
        location_fin: type === 'location' ? location_fin : undefined,
      });

      await order.save();
      createdOrders.push(order);

      // Update library
      await updateUserLibrary(userId, [
        {
          bookId,
          type,
          rentedFrom: type === 'location' ? location_debut : null,
          rentedTo: type === 'location' ? location_fin : null,
        },
      ]);

      // Add points
      let earnedPoints = 0;
      if (type === 'achat') {
        if (price >= 30) earnedPoints = 15;
        else if (price >= 10) earnedPoints = 10;
        else earnedPoints = 5;
      } else if (type === 'location') {
        if (price >= 30) earnedPoints = 7;
        else if (price >= 10) earnedPoints = 5;
        else earnedPoints = 2;
      }

      user.points.push({ amount: earnedPoints, earnedAt: new Date() });
    }

    user.lastPurchaseDate = new Date();
    await user.save();

    // Notify
    await Promise.all(
      createdOrders.map(order => createNotification(order, userId))
    );

    res.status(201).json({
      message: `Created ${createdOrders.length} orders`,
      orders: createdOrders,
    });
  } catch (error) {
    console.error("❌ Error in bulk createOrder:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// 📂 Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find().populate('user book');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err });
  }
};

// 📜 Get current user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('book');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user orders', error: err });
  }
};

// ❌ Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (err) {
    console.error("❌ Error in cancelOrder:", err);
    res.status(500).json({ message: 'Failed to cancel order', error: err });
  }
};

// ✅ Validate if rental is still active
const validateRentalAccess = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.type !== 'location') {
      return res.status(400).json({ message: 'This is not a rental order' });
    }

    const now = new Date();
    const isWithinRentalPeriod = now >= order.location_debut && now <= order.location_fin;

    if (!isWithinRentalPeriod) {
      return res.status(403).json({ message: 'Rental period has expired' });
    }

    res.status(200).json({ message: 'Rental valid' });

  } catch (err) {
    res.status(500).json({ message: 'Rental validation failed', error: err });
  }
};

// 🔒 Get secure PDF URL


module.exports = { createOrder, cancelOrder, getUserOrders, getAllOrders, validateRentalAccess,rentBookWithSubscription };
