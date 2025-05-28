const Book = require('../models/Book');
const Userlibrary = require('../models/Userlibrary'); // or wherever your model is
const mongoose = require('mongoose');
const genre = require('../utils/genre');
const uploadToSupabase = require('../utils/uploadToSupabase');  
const asyncHandler = require("express-async-handler");
const supabase = require('../supabase/supabaseClient'); // Supabase client file
const { v4: uuidv4 } = require('uuid');
const path = require('path');
 const Order = require('../models/Order'); 
// @desc Create a new book
// @route POST /api/books
// @access Private (Admin only)
// controllers/bookController.js

const createBook = async (req, res) => {
  try {
    console.log(req.body); // Log incoming body to check if data is correct
    console.log(req.files); // Log incoming files to check if files are uploaded correctly
    const { titre, auteur, description, prix_achat, prix_location, categorie } = req.body;

    const cleanedCategorie = categorie
      .replace(/[\[\]"']/g, '') // remove brackets and quotes
      .split(',')
      .map(c => c.trim());

    const pdfFile = req.files?.pdf?.[0];
    console.log("📥 PDF File:", pdfFile);
    const imageFile = req.files?.image?.[0];
    console.log("📥 Image File:", imageFile);
    const pdfUrl = await uploadToSupabase(pdfFile, 'bookpdf');
    console.log("📦 PDF Buffer Length:", pdfFile?.buffer?.length);
    const imageUrl = await uploadToSupabase(imageFile, 'bookcouvre');
    console.log("📷 Image Buffer Length:", imageFile?.buffer?.length);
    if (!pdfUrl || !imageUrl) {
      return res.status(500).json({ message: 'Failed to upload files to Supabase' });
    }

    const newBook = new Book({
      titre,
      auteur,
      description,
      prix_achat,
      prix_location,
      categorie: cleanedCategorie,
      fichierPDF: pdfUrl,
      imageCouverture: imageUrl,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book created successfully', book: newBook });

  } catch (err) {
    console.error('❌ Book creation failed:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// @desc Get all books
// @route GET /api/books
// @access Public
const getAllBooks = async (req, res) => {
  try {
    // Optional filters (if needed)
    const filters = {};
    if (req.query.categorie) filters.categorie = req.query.categorie;
    if (req.query.estDisponible) filters.estDisponible = req.query.estDisponible === 'true';

    const books = await Book.find(filters);
    const booksWithImageUrl = books.map(book => ({
      ...book.toObject(),
      imageCouverture: `https://txdbbefcokygpcjhzgfb.supabase.co/storage/v1/object/public/bookcouvre/${book.imageCouverture}`
    }));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a book by ID
// @route GET /api/books/getbookbyid
// @access Public
const getBookById = async (req, res) => {
  const { id } = req.params;

  // Ensure the ID is valid and convert it to an ObjectId if necessary
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Query by ObjectId
    const book = await Book.findById(id);  // Using only the id here
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the book', error: error.message });
  }
};

// @desc Update a book
// @route PUT /api/books/:id
// @access Private (Admin only)
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { titre, auteur, description, prix, categorie, fichierPDF, estALouer } = req.body;
  if (categorie && !allowedGenres.includes(categorie)) {
    return res.status(400).json({ message: `Invalid category. Must be one of: ${allowedGenres.join(', ')}` });
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, {
      titre,
      auteur,
      description,
      prix,
      categorie,
      fichierPDF
    }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete a book
// @route DELETE /api/books/:id
// @access Private (Admin only)
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Rate a book
// @route POST /api/books/:id/rate
// @access Private (User)
const rateBook = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const userId = req.user._id;

  const ratingValue = Number(rating);
  if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.evaluations = book.evaluations || [];

    const existingRatingIndex = book.evaluations.findIndex(
      r => r.user && r.user.equals(userId)
    );

    if (existingRatingIndex !== -1) {
      book.evaluations[existingRatingIndex].note = ratingValue;
    } else {
      book.evaluations.push({ user: userId, note: ratingValue });
    }

    if (book.evaluations.length === 0) {
      book.noteMoyenne = 0;
      book.nbEvaluations = 0;
    } else {
      const total = book.evaluations.reduce((sum, evalItem) => sum + (evalItem.note || 0), 0);
      const average = total / book.evaluations.length;
      book.noteMoyenne = isNaN(average) ? 0 : average;
      book.nbEvaluations = book.evaluations.length;
    }

    await book.save();

    res.status(200).json({ 
      message: 'Rating submitted successfully', 
      noteMoyenne: book.noteMoyenne, 
      nbEvaluations: book.nbEvaluations 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Add a comment to a book
// @route POST /api/books/:id/comment
// @access Private (User)
const addComment = async (req, res) => {
  const { id } = req.params;
const texte = req.body.texte || req.body.comment;


  // Ensure the comment text is not empty
  if (!texte || texte.trim().length === 0) {
    return res.status(400).json({ message: 'Comment text cannot be empty' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newComment = {
      user: req.user._id,
      texte,
    };

    book.commentaires.push(newComment);
    await book.save();

    // Return the entire updated list of comments
    res.status(201).json({ message: 'Comment added successfully', commentaires: book.commentaires });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooksSortedByRating = async (req, res) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }); // Sort books by averageRating in descending order
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load books', error: err });
  }
};



//barre de recherche
const searchBooks = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  const regex = new RegExp(query, "i"); // case-insensitive

  const books = await Book.find({
    $or: [
      { titre: { $regex: regex } },
      { auteur: { $regex: regex } },
      { categorie: { $in: [regex] } },
    ],
  });

  res.status(200).json(books);
});
const getNewBooksForUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.genre_prefere || user.genre_prefere.length === 0) {
      return res.status(400).json({ message: 'User has no favorite genres.' });
    }

    const favoriteGenres = user.genre_prefere;
    console.log("User's favorite genres:", favoriteGenres);

    // Select one random genre from user's preferences
    const randomGenre = favoriteGenres[Math.floor(Math.random() * favoriteGenres.length)];
    console.log("Randomly selected genre:", randomGenre);

    // Search in 'categorie' field which is an array
    const latestBook = await Book.findOne({
      categorie: { $in: [randomGenre] }
    }).sort({ dateAjout: -1 });

    if (!latestBook) {
      return res.status(404).json({ message: 'No new books found for the selected genre.' });
    }

    return res.status(200).json([latestBook]);
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching new books for user.' });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Book.distinct("auteur");
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch authors", error: err.message });
  }
};
// @desc Get books with filters (category, price range, rating, author)
// @route GET /api/books/filter
// @access Public
const getFilteredBooks = async (req, res) => {
  try {
    const { categorie, prixMin, prixMax, noteMin, auteur } = req.query;

    const query = {};

    if (categorie) {
      query.categorie = { $in: categorie.split(',') };
    }

    if (prixMin || prixMax) {
      query.prix_achat = {};
      if (prixMin) query.prix_achat.$gte = parseFloat(prixMin);
      if (prixMax) query.prix_achat.$lte = parseFloat(prixMax);
    }

    if (noteMin) {
      query.noteMoyenne = { $gte: parseFloat(noteMin) };
    }

    if (auteur) {
      query.auteur = new RegExp(auteur, 'i'); // case-insensitive search
    }

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering books', error: error.message });
  }
};
// @desc Like or Unlike a book
// @route POST /api/books/:id/like
// @access Private (User)
const likeBookController = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const userId = req.user._id;  // Get the authenticated user's ID

    // Check if the book is already liked by the user
    const alreadyLiked = book.likedBy.includes(userId);

    if (alreadyLiked) {
      // If the book is already liked, remove the user from likedBy array
      book.likedBy = book.likedBy.filter(user => user.toString() !== userId.toString());
    } else {
      // If the book is not liked, add the user to likedBy array
      book.likedBy.push(userId);
    }

    // Save the updated book document
    await book.save();

    // Return the status of the like toggle action
    res.json({ 
      success: true, 
      liked: !alreadyLiked,
      likes: book.likedBy.length  // send back updated number of likes
    });
     // Return whether the book is now liked or not
  } catch (error) {
    console.error('Error during like action:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const removeLikeFromBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  const userId = req.user._id;

  // Remove user from likes array
  book.likes = book.likes.filter((id) => id.toString() !== userId.toString());
  await book.save();

  res.status(200).json({ message: 'Book unliked' });
});
 const getLikedBooks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('likedBooks');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user.likedBooks); // Array of book IDs
});
const getBookPdf = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    const now = new Date();

    // 🔍 Check regular orders (buy or rent)
    const orders = await Order.find({ user: userId, book: bookId });

    let hasAccess = orders.some(order => {
      if (order.type === 'achat') return true;
      if (order.type === 'location') {
        return new Date(order.location_debut) <= now && new Date(order.location_fin) >= now;
      }
      return false;
    });

    let canDownload = orders.some(order => order.type === 'achat');

    // 🔍 If no access via Order, check Userlibrary (for subscription rentals)
    if (!hasAccess) {
      const userLibrary = await Userlibrary.findOne({ user: userId });
      if (userLibrary) {
        const bookEntry = userLibrary.books.find(
          entry => entry.bookId.toString() === bookId
        );

        if (bookEntry && bookEntry.type === 'location') {
          const rentedFrom = new Date(bookEntry.rentedFrom);
          const rentedTo = new Date(bookEntry.rentedTo);
          if (rentedFrom <= now && rentedTo >= now) {
            hasAccess = true;
            canDownload = false; // No download for subscription-based rentals
          }
        } else if (bookEntry && bookEntry.type === 'achat') {
          hasAccess = true;
          canDownload = true;
        }
      }
    }

    if (!hasAccess) {
      return res.status(403).json({ message: "No access to this book" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const fullUrl = book.fichierPDF || book.pdf_url;
    const fileName = decodeURIComponent(
      fullUrl.replace(
        "https://txdbbefcokygpcjhzgfb.supabase.co/storage/v1/object/public/bookpdf/",
        ""
      )
    );

    const { data, error } = await supabase.storage
      .from('bookpdf')
      .createSignedUrl(fileName, 60);

    if (error || !data?.signedUrl) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to generate secure PDF URL', error });
    }

    if (!canDownload) {
      res.setHeader('Content-Disposition', 'inline');
    }

    res.status(200).json({
      pdfUrl: data.signedUrl,
      canDownload,
    });

  } catch (err) {
    console.error("❌ Error in getBookPdf:", err);
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
};

const getLatestComment = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id)
      .populate({
        path: 'commentaires.user',
        select: 'nom photo_profil', // using 'nom' and 'photo_profil' from your schema
      });

    if (!book || book.commentaires.length === 0) {
      return res.status(404).json({ message: 'No comments found for this book.' });
    }

    const latestComment = book.commentaires[book.commentaires.length - 1];

    const userRating = book.evaluations.find(
      (eval) => eval.user.toString() === latestComment.user._id.toString()
    );

    res.json({
      userName: latestComment.user.nom,
      userPhoto: latestComment.user.photo_profil,
      commentText: latestComment.texte,
      date: latestComment.date,
      rating: userRating ? userRating.note : null,
    });
  } catch (error) {
    console.error('Error fetching latest comment:', error);
    res.status(500).json({ message: 'Server error while fetching comment.' });
  }
};
const checkUserReviewed = async (req, res) => {
  const { bookId, userId } = req.params;

  try {
    const book = await Book.findById(bookId).select('evaluations');

    if (!book) return res.status(404).json({ message: 'Book not found' });

    const hasReviewed = book.evaluations.some(e => e.user.toString() === userId);
    res.json({ hasReviewed });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getBestSeller = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$book",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" }
    ]);

  if (result.length === 0) {
    return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json([result[0].book]); 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getMostRatedBook = async (req, res) => {
  try {
    const [book] = await Book.aggregate([
      {
        $addFields: {
          score: { $multiply: ["$noteMoyenne", "$nbEvaluations"] }
        }
      },
      { $sort: { score: -1 } },
      { $limit: 1 }
    ]);

    if (!book) {
      return res.status(404).json({ success: false, message: 'No book found' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {getFilteredBooks,getMostRatedBook,getBestSeller,checkUserReviewed,getLatestComment,getBookPdf,getLikedBooks,removeLikeFromBook,likeBookController,getAllAuthors,getNewBooksForUser, updateBook, createBook, getAllBooks, getBookById, deleteBook, rateBook ,addComment,getBooksSortedByRating,searchBooks};
