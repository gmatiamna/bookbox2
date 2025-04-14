const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


// Routes

router.put('/settings',protect, updateUserProfile);
router.post('/signup', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.post('/login', loginUser);
module.exports = router;
