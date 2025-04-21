const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook,deleteBook ,rateBook  ,addComment ,getBooksSortedByRating} = require('../controllers/bookController');
const { protect,isAdmin } = require('../middleware/authMiddleware');
// Routes
router.post('/createBook',protect,isAdmin, createBook);
router.get('/getbooks', getAllBooks);
router.get('/getbookbyid', getBookById);  
router.put('/updateBook/:id',protect, isAdmin,updateBook);
router.delete('/deleteBook/:id',protect,isAdmin,deleteBook);
router.post('/:id/rateBook',protect, rateBook); 
router.post('/:id/comment', protect, addComment);

router.get('/api/books/sorted', getBooksSortedByRating);
module.exports = router;
