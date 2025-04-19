const express = require('express');
const router = express.Router();
const {
  createOrder,
  getBookAccess,
  cancelOrder,
  getAllOrders,
  getUserOrders,
  validateRentalAccess
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware'); // Auth check

// 📦 Create a new order (buy/rent a book)
router.post('/', protect, createOrder);

// 📂 Get all orders (admin only)
router.get('/all', protect, getAllOrders); // Add role check in controller

// 📜 Get current user's orders
router.get('/my-orders', protect, getUserOrders);

// ❌ Cancel an order
router.delete('/:id', protect, cancelOrder);

// ✅ Validate if rental is still active
router.get('/validate/:orderId', protect, validateRentalAccess);

// 🔓 Check if user has access to a specific book they ordered
router.get('/access/:bookId', protect, getBookAccess);

module.exports = router;
