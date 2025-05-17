const mongoose = require('mongoose');
const genre = require('../utils/genre');

const bookSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  auteur: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prix_achat: {
    type: Number,
    required: true
  },
  prix_location: {
    type: Number,
    required: true
  },
  categorie: [{
    type: String,
    enum: [
      "Fantasy", "Science Fiction", "Mystery", "Romance", "Horror",
      "Thriller", "Historical", "Philosophy", "True Crime", "Business"
    ],
    required: true
  }],
  fichierPDF: {
    type: String,
    required: true
  },
  imageCouverture: {
    type: String,
    required: true
  },
  noteMoyenne: {
    type: Number,
    default: 0
  },
  nbEvaluations: {
    type: Number,
    default: 0
  },
  commentaires: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      texte: String,
      date: { type: Date, default: Date.now }
    }
  ],
  evaluations: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      note: { type: Number, min: 1, max: 5 }
    }
  ],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dateAjout: {
    type: Date,
    default: Date.now
  },
  
  // ✅ CACHED discount from applied offer
  discountedPrice: {
    type: Number,
    default: null
  },

  // ✅ Active offer reference
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    default: null
  }
});

module.exports = mongoose.model('Book', bookSchema);
