const OrderNotification = require('../models/OrderNotification');


// Create a new notification for an order
const createNotification = async (order, userId) => {
  try {
    const message = `Your order for the book "${order.book.title}" has been processed successfully.`;

    const notification = new OrderNotification({
      user: userId,
      order: order._id,
      message,
    });

    await notification.save();
    console.log('Notification created');
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Fetch notifications for a user
const getNotificationsForUser = async (req, res) => {
  try {
    const notifications = await OrderNotification.find({ user: req.user._id })
      .sort({ timestamp: -1 }) // Sort by latest notification first
      .limit(10); // Limit to 10 notifications for now

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Mark a notification as seen
const markNotificationAsSeen = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await OrderNotification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.seen = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as seen' });
  } catch (error) {
    console.error('Error marking notification as seen:', error);
    res.status(500).json({ message: 'Error marking notification as seen' });
  }
};

module.exports = { createNotification, getNotificationsForUser, markNotificationAsSeen };
