const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const genreData = require('../utils/genre');
const allowedGenres = genreData.map((g) => g.name);

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  d_ness: { type: Date, required: true },
  mot_de_passe: { type: String, required: true },
  firstLogin: { type: Boolean, default: true },
  genre_prefere: {
    type: [String],
    enum: allowedGenres,
    validate: {
      validator: function (val) {
        return val.length <= 3;
      },
      message: 'You can select up to 3 preferred genres only.',
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  date_inscription: {
    type: Date,
    default: Date.now,
  },
  photo_profil: {
    type: String,
    default: 'default-avatar.png',
  },
  claimedOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    default: null,
  },
  offerExpiresAt: {
  type: Date,
},
  points: [{
    amount: Number,
    earnedAt: { type: Date, default: Date.now }
  }],
  lastPurchaseDate: Date,

  // New fields for password reset
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.mot_de_passe);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (this.isModified("mot_de_passe")) {
    const salt = await bcrypt.genSalt(10);
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
    this.updatedAt = Date.now(); // Set updatedAt to the current timestamp
  }
  if (this.isModified("nom") || this.isModified("email")) {
    this.updatedAt = Date.now(); // Set updatedAt to the current timestamp
  }
  next();
});

// Method to generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
  const token = require('crypto').randomBytes(20).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration time
  return token;
};

// Method to check if reset token is valid
userSchema.methods.isResetPasswordTokenValid = function (token) {
  return this.resetPasswordToken === token && this.resetPasswordExpires > Date.now();
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
