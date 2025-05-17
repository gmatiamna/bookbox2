const Userlibrary = require("../models/Userlibrary");


const updateUserLibrary = async (userId, items) => {
  try {
    let userLibrary = await Userlibrary.findOne({ user: userId });

    if (!userLibrary) {
      // Create a new library document if it does not exist
      userLibrary = new Userlibrary({ user: userId, books: [] });
    }

    items.forEach(item => {
      const existingBook = userLibrary.books.find(book => book.bookId.toString() === item.bookId.toString());

      if (!existingBook) {
        const newBook = {
          bookId: item.bookId,
          type: item.type, // "achat" or "location"
          rentedFrom: item.rentedFrom || null,
          rentedTo: item.rentedTo || null,
        };
        userLibrary.books.push(newBook);
      } else {
        // If the book already exists in the library, you may want to update the rental dates (for rentals)
        if (item.type === 'location' && !existingBook.rentedTo) {
          existingBook.rentedFrom = item.rentedFrom;
          existingBook.rentedTo = item.rentedTo;
        }
      }
    });

    await userLibrary.save();
  } catch (err) {
    console.error("📚 Failed to update user library:", err);
  }
};


const getUserLibrary = async (req, res) => {
  try {
    const userLibrary = await Userlibrary.findOne({ user: req.user._id }).populate('books.bookId');

    if (!userLibrary) {
      return res.status(404).json({ message: "Library not found" });
    }

    // Filter out expired rentals
    const currentDate = new Date();
    const filteredBooks = userLibrary.books.filter(book => {
      if (book.type === 'location' && book.rentedTo) {
        return new Date(book.rentedTo) >= currentDate; // Only include books that are not expired
      }
      return true; // Include purchased books or non-expired rentals
    });

    res.status(200).json({ books: filteredBooks });
  } catch (err) {
    console.error("❌ Error in getUserLibrary:", err);
    res.status(500).json({ message: "Failed to load library", error: err });
  }
};

module.exports = { updateUserLibrary, getUserLibrary };
