const express = require('express');
const router = express.Router();
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

const { protect } = require('../middleware/authMiddleware');

// All routes are protected, user must be logged in

// Get the current user's cart
router.get('/', protect, getUserCart);

// Add item to cart
router.post('/', protect, addToCart);

// Update cart item (quantity or type)
router.put('/', protect, updateCartItem);

// Remove one item from cart
router.delete('/:itemId', protect, removeFromCart);

// Clear entire cart
router.delete('/', protect, clearCart);

module.exports = router;
