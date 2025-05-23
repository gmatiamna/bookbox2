// models/UserSubscription.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSubscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserSubscription', userSubscriptionSchema);
