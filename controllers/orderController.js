const Order = require('../models/Order');
const Offer = require('../models/Offer');
const User = require('../models/User');
const { createNotification } = require('../controllers/orderNotificationController');

const createOrder = async (req, res) => {
  try {
    const { bookId, type, prix, location_debut, location_fin } = req.body;

    if (!bookId || !type || !prix) {
      return res.status(400).json({ message: "Book, type, and price are required" });
    }

    if (type === 'location' && (!location_debut || !location_fin)) {
      return res.status(400).json({ message: "Location dates are required for renting" });
    }

    // 🔎 Check if user has claimed an offer
    const user = await User.findById(req.user._id).populate('claimedOffer');
    let finalPrice = prix;

    if (user.claimedOffer) {
      const offer = user.claimedOffer;
      finalPrice = prix - (prix * (offer.discountPercentage / 100));
      finalPrice = Math.max(finalPrice, 0); // avoid negative price
    }

    // 🧾 Create the order with final (discounted or normal) price
    const order = new Order({
      user: req.user._id,
      book: bookId,
      type,
      prix: finalPrice,
      location_debut: type === 'location' ? location_debut : undefined,
      location_fin: type === 'location' ? location_fin : undefined,
    });

    // Save the order
    await order.save();

    // Create the order notification
    await createNotification(order, req.user._id);

    // Respond with order details and the discount message if applicable
    res.status(201).json({
      message: user.claimedOffer
        ? `Order created with ${user.claimedOffer.discountPercentage}% discount`
        : "Order created successfully",
      order,
      notification: "You have a new order notification!", // Custom notification message (or adjust as needed)
    });

  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || error,
    });
  }
};

  const getBookAccess = async (req, res) => {
    try {
      const userId = req.user._id;
      const bookId = req.params.bookId;
  
      const orders = await Order.find({
        user: userId,
        book: bookId,
      });
  
      const now = new Date();
  
      const hasAccess = orders.some(order => {
        if (order.type === 'achat') return true;
        if (order.type === 'location') {
          return order.location_debut <= now && order.location_fin >= now;
        }
        return false;
      });
  
      if (!hasAccess) {
        return res.status(403).json({ access: false, message: 'No valid access to this book' });
      }
  
      return res.status(200).json({ access: true, message: 'Access granted' });
  
    } catch (err) {
      console.error('❌ Error in getBookAccess:', err);
      return res.status(500).json({ message: 'Server error', error: err });
    }
  };
  // controllers/orderController.js
  const getAllOrders = async (req, res) => {
    try {
      // Ensure only admins can access this
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      // Fetch orders and populate 'user' and 'book' fields
      const orders = await Order.find().populate('user book');
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch orders', error: err });
    }
  };
  
  const getUserOrders = async (req, res) => {
    try {
      // Fetch orders for the logged-in user and populate 'book' field
      const orders = await Order.find({ user: req.user._id }).populate('book');
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user orders', error: err });
    }
  };
  
  const cancelOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if user is the owner or an admin
      if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Order canceled successfully' });
    } catch (err) {
      console.error("❌ Error in cancelOrder:", err); // Add this line
      res.status(500).json({ message: 'Failed to cancel order', error: err });
    }
  };
  
  const validateRentalAccess = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
  
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      if (order.type !== 'rent') {
        return res.status(400).json({ message: 'This is not a rental order' });
      }
  
      const now = new Date();
      const isWithinRentalPeriod = now >= order.startDate && now <= order.endDate;
  
      if (!isWithinRentalPeriod) {
        return res.status(403).json({ message: 'Rental period has expired' });
      }
  
      // Access granted (e.g., send download link)
      res.status(200).json({ message: 'Rental valid', pdfUrl: order.bookPdfUrl });
    } catch (err) {
      res.status(500).json({ message: 'Rental validation failed', error: err });
    }
  };
   
module.exports = { createOrder,getBookAccess,cancelOrder, getUserOrders,getAllOrders,validateRentalAccess};
