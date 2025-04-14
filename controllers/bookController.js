const Book = require('../models/Book');

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

module.exports = { createBook };
