const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.post("/add/:bookId", addToWishlist);
router.delete("/remove/:bookId", removeFromWishlist);
router.get('/', protect, getWishlist);

module.exports = router;
