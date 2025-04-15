const Wishlist = require('../models/Wishlist');
const Book = require('../models/Book');

// Add a book to wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, books: [bookId] });
    } else {
      if (!wishlist.books.includes(bookId)) {
        wishlist.books.push(bookId);
      }
    }

    await wishlist.save();
    res.status(200).json({ message: 'Book added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Remove a book from wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.books = wishlist.books.filter(id => id.toString() !== bookId);
    await wishlist.save();

    res.status(200).json({ message: 'Book removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('books');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};
