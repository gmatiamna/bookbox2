const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  d_ness: { type: Date, required: true },
  mot_de_passe: { type: String, required: true },
  genre_prefere: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  date_inscription: {
    type: Date,
    default: Date.now
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

// Virtual to exclude password from output
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.mot_de_passe; // Don't return password
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
