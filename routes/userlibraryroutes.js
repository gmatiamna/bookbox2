const express = require('express');
const router = express.Router();
const { getUserLibrary } = require('../controllers/userlibraryController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/library
// @desc    Get user's library with expiration check
// @access  Private
router.get('/', protect, getUserLibrary);

module.exports = router;
