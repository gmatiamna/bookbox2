// models/Offer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,  // cart_based, time_based, user_based, etc.
    required: true,
  },
  discount: {
    type: String,  // percentage or fixed amount (e.g., "10%" or "10 TND")
    required: true,
  },
  condition: {
    type: String,  // e.g., "3_books", "new_user", etc.
    required: false,
  },
  days_active: {
    type: [String],  // e.g., ["Friday", "Saturday", "Sunday"]
    required: false,
  },
  requires_verification: {
    type: Boolean,
    default: false,
  },
  duration_days: {
    type: Number,  // duration for time-based offers (e.g., 7 days for rentals)
    required: false,
  },
});

module.exports = mongoose.model('Offer', offerSchema);
