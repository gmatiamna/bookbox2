const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');
const genres = require('../utils/genre'); // Importing genres from utils
const {getAllAuthors,getMostRatedBook,getLikedBooks,checkUserReviewed,getBestSeller,getLatestComment,removeLikeFromBook,getFilteredBooks,likeBookController,getBookPdf, getNewBooksForUser,createBook, getAllBooks, getBookById, updateBook, deleteBook, rateBook, addComment, searchBooks, getBooksSortedByRating } = require('../controllers/bookController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route to get the list of genres
router.get('/getGenres', (req, res) => {
    res.json(genres); // Send the array of genres to the frontend
});

// Routes for book operations
router.post('/createBook', protect, isAdmin, upload.fields([{ name: 'pdf' }, { name: 'image' }]), createBook);
router.get('/getbooks', getAllBooks);
router.get("/best-seller", getBestSeller);
router.get('/most-rated', getMostRatedBook);
router.post('/:id/like', protect, likeBookController);
router.delete('/:id/like', protect, removeLikeFromBook);
router.put('/updateBook/:id', protect, isAdmin, updateBook);
router.delete('/deleteBook/:id', protect, isAdmin, deleteBook);
router.post('/:id/rateBook', protect, rateBook); 
router.post('/:id/comment', protect, addComment);
router.get('/sorted', getBooksSortedByRating);  // Fixed this route
router.get("/search", searchBooks);
router.get("/authors", getAllAuthors);
router.get("/filterbook", getFilteredBooks);
// GET /books/liked
router.get('/liked', protect, getLikedBooks);
router.get('/secure-pdf/:bookId', protect, getBookPdf);
router.get('/new-favorites', protect, getNewBooksForUser);
router.get('/:id', getBookById);
router.get('/:id/comments/latest', getLatestComment);
router.get('/:bookId/has-reviewed/:userId', checkUserReviewed);

module.exports = router;
