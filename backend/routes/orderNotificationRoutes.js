// routes/orderNotificationRoutes.js
const express = require('express');
const router = express.Router();
const { getNotificationsForUser, markNotificationAsSeen } = require('../controllers/orderNotificationController');
const { protect } = require('../middleware/authMiddleware');

// Get all notifications for the user
router.get('/', protect, getNotificationsForUser);

// Mark notification as seen
router.patch('/:id/seen', protect, markNotificationAsSeen);

module.exports = router;
