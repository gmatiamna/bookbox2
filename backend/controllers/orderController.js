const Order = require('../models/Order');
const Offer = require('../models/Offer');
const User = require('../models/User');
const Book = require('../models/Book');
const Cart = require('../models/Cart');  // or wherever your Cart model is defined

const { createNotification } = require('../controllers/orderNotificationController');
const { updateUserLibrary } = require('./userlibraryController');
const { supabase } = require('../supabase/supabaseClient');
const UserSubscription = require("../models/UserSubscription");
const Userlibrary = require('../models/Userlibrary');

const rentBookWithSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: 'User or book not found' });
    }

    // ✅ Check for active subscription
    const subscription = await UserSubscription.findOne({
      userId: userId,
      status: 'active',
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    });

    if (!subscription) {
      return res.status(403).json({ message: 'No active subscription' });
    }

    // ✅ Use your Userlibrary model
    let userLibrary = await Userlibrary.findOne({ user: userId });

    if (!userLibrary) {
      userLibrary = new Userlibrary({ user: userId, books: [] });
    }

    // ✅ Check if book already exists
    const alreadyExists = userLibrary.books.some(
      entry => entry.bookId.toString() === bookId
    );

    if (alreadyExists) {
      return res.status(409).json({ message: 'Book already in library' });
    }

    // ✅ Rental logic
    const now = new Date();
    const rentalEnd = new Date(now);
    rentalEnd.setDate(now.getDate() + 30);

    userLibrary.books.push({
      bookId: bookId,
      type: 'location',
      rentedFrom: now,
      rentedTo: rentalEnd,
    });

    await userLibrary.save();

    return res.status(200).json({ message: 'Book rented and added to library' });
  } catch (err) {
    console.error("❌ rentBookWithSubscription error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
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
