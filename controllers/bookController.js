const Book = require('../models/Book');
const mongoose = require('mongoose');

// @desc Create a new book
// @route POST /api/books
// @access Private (Admin only)
const createBook = async (req, res) => {
  const { titre, auteur, description, prix, categorie, fichierPDF, estALouer } = req.body;

  try {
    const newBook = new Book({
      titre,
      auteur,
      description,
      prix,
      categorie,
      fichierPDF,
      estALouer,
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

module.exports = { createBook, getAllBooks, getBookById };
