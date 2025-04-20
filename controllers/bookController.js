const Book = require('../models/Book');
const mongoose = require('mongoose');
const allowedGenres = require('../utils/genre');

// @desc Create a new book
// @route POST /api/books
// @access Private (Admin only)
const createBook = async (req, res) => {
  const {
    titre, auteur, description,
    prix_achat, prix_location,
    categorie, fichierPDF, imageCouverture, estALouer
  } = req.body;

  if (!Array.isArray(categorie) || categorie.some(cat => !allowedGenres.includes(cat))) {
    return res.status(400).json({ message: `Invalid category. Must be one of: ${allowedGenres.join(', ')}` });
  }

  try {
    const newBook = new Book({
      titre,
      auteur,
      description,
      prix_achat,
      prix_location,
      categorie,
      fichierPDF,         // already a Cloudinary URL
      imageCouverture,    // also a Cloudinary URL
      estALouer
    });

    const book = await newBook.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a book by ID
// @route GET /api/books/getbookbyid
// @access Public
const getBookById = async (req, res) => {
  const { id } = req.query;

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
      fichierPDF,
      estALouer
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
  const { note } = req.body;

  if (note < 1 || note > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the user has already rated the book
    const existingRating = book.evaluations.find(
      (evaluation) => evaluation.user.toString() === req.user._id.toString()
    );
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this book' });
    }

    book.evaluations.push({ user: req.user._id, note });
    book.nbEvaluations += 1;
    book.noteMoyenne = (
      book.evaluations.reduce((acc, evaluation) => acc + evaluation.note, 0) / 
      book.nbEvaluations
    ).toFixed(1);

    await book.save();
    res.status(200).json({ message: 'Book rated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc Add a comment to a book
// @route POST /api/books/:id/comment
// @access Private (User)
const addComment = async (req, res) => {
  const { id } = req.params;
  const { texte } = req.body;

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


module.exports = { updateBook, createBook, getAllBooks, getBookById, deleteBook, rateBook ,addComment};
