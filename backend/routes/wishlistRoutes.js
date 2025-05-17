const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist ,likeBook} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');
router.post('/like/:bookId', protect, likeBook);
router.post('/add', protect, addToWishlist);
router.delete('/remove', protect, removeFromWishlist);
router.get('/', protect, getWishlist);

module.exports = router;
