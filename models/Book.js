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
  estDisponible: {
    type: Boolean,
    default: true
  },
  categorie: [{
    type: String,
    enum: genre,
    required: true
  }],
  fichierPDF: {
    type: String, // Store file path or URL
    required: true
  },
  estALouer: {
    type: Boolean,
    default: false
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
  dateAjout: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
