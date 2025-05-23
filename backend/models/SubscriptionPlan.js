const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionPlanSchema = new Schema({
  name: { type: String, required: true, enum: ['Monthly Plan', 'Seasonal Plan', 'Annual Plan'] },
  price: { type: Number, required: true }, // e.g. 30, 75, 250
 durationDays: { type: Number, required: true }, // 30, 90, 365
  benefits: [{ type: String }], // List of features included
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
