const Wishlist = require('../models/Wishlist');
const Book = require('../models/Book');

// Add a book to wishlist (Like)
exports.addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, books: [bookId] });
      book.nbLikes = (book.nbLikes || 0) + 1;
    } else {
      if (!wishlist.books.includes(bookId)) {
        wishlist.books.push(bookId);
        book.nbLikes = (book.nbLikes || 0) + 1;
      } else {
        return res.status(400).json({ message: 'Book already in wishlist' });
      }
    }

    await wishlist.save();
    await book.save();

    res.status(200).json({ message: 'Book added to wishlist and liked', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Remove a book from wishlist (Unlike)
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    const book = await Book.findById(bookId);

    if (!wishlist || !book) {
      return res.status(404).json({ message: 'Wishlist or Book not found' });
    }

    const index = wishlist.books.indexOf(bookId);
    if (index === -1) {
      return res.status(400).json({ message: 'Book not in wishlist' });
    }

    wishlist.books.splice(index, 1);
    book.nbLikes = Math.max((book.nbLikes || 1) - 1, 0);

    await wishlist.save();
    await book.save();

    res.status(200).json({ message: 'Book removed from wishlist and unliked', wishlist });
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
      return res.status(200).json({ books: [] }); // return empty list if none found
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};
exports.likeBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // prevent duplicate likes — optional
    if (book.likedBy && book.likedBy.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }

    book.nbLikes += 1;
    book.likedBy = book.likedBy || [];
    book.likedBy.push(userId);
    await book.save();
    console.log("Like clicked", bookId);
    res.status(200).json({ message: "Liked", likes: book.nbLikes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};