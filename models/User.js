const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  d_ness: { type: Date, required: true },
  mot_de_passe: { type: String, required: true },
  genre_prefere: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  date_inscription: {
    type: Date,
    default: Date.now,
  },
  panier: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book", // Assuming 'book' is the name of the related model for items in the shopping cart
    },
  ],
   wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
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
    // Update the updatedAt field whenever the password is modified
    this.updatedAt = Date.now(); // Set updatedAt to the current timestamp
  }
  // Update the updatedAt field if username or email is modified
  if (this.isModified("nom") || this.isModified("email")) {
    this.updatedAt = Date.now(); // Set updatedAt to the current timestamp
  }
  next();
});

// Apply the unique validator plugin to the schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
