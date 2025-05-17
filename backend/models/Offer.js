const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['cart_based', 'time_based', 'subscription', 'book_specific', 'sitewide'] 
  }, // categorizes the offer

  discount: { type: Number, required: true }, // percentage or flat rate
  condition: { type: String }, // e.g., "min purchase of $10"
  days_active: { type: [String] }, // ["Monday", "Tuesday", ...]
  requires_verification: { type: Boolean, default: false },
  duration_days: { type: Number }, // how long the offer lasts
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false }, // now optional
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Optional extension fields
  isSubscriptionOffer: { type: Boolean, default: false },
  planLevel: { type: String, enum: ['basic', 'premium', 'vip'], required: false },

}, {
  timestamps: true
});

module.exports = mongoose.model('Offer', offerSchema);
