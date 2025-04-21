const Userlibrary = require("../models/Userlibrary");

const updateUserLibrary = async (userId, items) => {
  try {
    let userLibrary = await Userlibrary.findOne({ user: userId });

    if (!userLibrary) {
      // Create a new library document if it does not exist
      userLibrary = new Userlibrary({ user: userId, books: [] });
    }

    const newBooks = items.map(item => ({
      bookId: item.bookId,
      type: item.type,
      rentedFrom: item.rentedFrom || null,
      rentedTo: item.rentedTo || null,
    }));

    userLibrary.books.push(...newBooks);
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

    // Further logic to handle expired books and filter
    res.status(200).json({ books: userLibrary.books });
  } catch (err) {
    console.error("❌ Error in getUserLibrary:", err);
    res.status(500).json({ message: "Failed to load library", error: err });
  }
};


module.exports = { updateUserLibrary, getUserLibrary };
