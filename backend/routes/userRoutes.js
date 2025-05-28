const express = require('express');
const router = express.Router();
const {
  signupAdmin,
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  uploadProfilePhoto,
  getUserPoints,
  updatePreferredGenres,
  forgotPassword,   // <-- Add this
  resetPassword ,getUserStats    // <-- Add this
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const genres = require('../utils/genre');

// Routes
router.get('/genres', (req, res) => {
  console.log('Fetching genres...');
  res.json(genres);
});
router.put('/settings', protect, updateUserProfile);
router.post('/signup', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.post('/login', loginUser);
router.put('/update-profile-photo', protect, uploadProfilePhoto);
router.get('/points', protect, getUserPoints);
router.patch('/genres', protect, updatePreferredGenres);
router.get('/:id/stats', getUserStats);
// 👉 Password reset routes
router.post('/forgot-password', forgotPassword); // Send reset email
router.post('/reset-password/:token', resetPassword); // Actually reset password

module.exports = router;
