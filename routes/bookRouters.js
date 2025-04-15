const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook,deleteBook ,rateBook  ,addComment } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
// Routes
router.post('/createBook', createBook);
router.get('/getbooks', getAllBooks);
router.get('/getbookbyid', getBookById);  
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);
router.post('/:id/rateBook',protect, rateBook); 
router.post('/:id/comment', protect, addComment);
module.exports = router;
