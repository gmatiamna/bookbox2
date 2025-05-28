const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// ✅ Add protect here too:
router.post('/add', protect, addToWishlist);
router.delete('/remove', protect, removeFromWishlist);
router.get('/', protect, getWishlist);

module.exports = router;

