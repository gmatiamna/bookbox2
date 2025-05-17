const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true }, // cart_based, time_based, etc.
  discount: { type: Number, required: true }, // store as number, not string!
  condition: { type: String },
  days_active: { type: [String] },
  requires_verification: { type: Boolean, default: false },
  duration_days: { type: Number },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // ✅ ADD THIS
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true // ✅ ADD THIS
});

module.exports = mongoose.model('Offer', offerSchema);
