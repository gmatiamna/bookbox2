const express = require('express');
const router = express.Router();
const {
  signupAdmin
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');


// Routes
router.post('/signup-admin', protect, signupAdmin);

module.exports = router;
