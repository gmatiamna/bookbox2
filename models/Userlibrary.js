const mongoose = require('mongoose');
const userLibrarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      type: {
        type: String,
        enum: ['achat', 'location'], // Ensure both 'achat' and 'location' are valid values
        required: true,
      },
      rentedFrom: Date,
      rentedTo: Date,
    },
  ],
});


module.exports = mongoose.model("Userlibrary", userLibrarySchema);
