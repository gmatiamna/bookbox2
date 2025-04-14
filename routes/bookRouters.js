const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById } = require('../controllers/bookController');

// Routes
router.post('/createBook', createBook);
router.get('/getbooks', getAllBooks);
router.get('/getbookbyid', getBookById);  // Ensure this is correctly set

module.exports = router;
