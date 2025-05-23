const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  type: {
    type: String,
    enum: ['achat', 'location'],
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  date_commande: {
    type: Date,
    default: Date.now
  },
  location_debut: Date,
  location_fin: Date,
   fromSubscription: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Order', orderSchema);
