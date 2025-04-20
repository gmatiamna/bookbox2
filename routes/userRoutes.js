const express = require('express');
const router = express.Router();
const {
  signupAdmin,
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  uploadProfilePhoto
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


// Routes

router.put('/settings',protect, updateUserProfile);
router.post('/signup', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.post('/login', loginUser);
router.put('/update-profile-photo', protect, uploadProfilePhoto);

module.exports = router;
