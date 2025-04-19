const express = require('express');
const router = express.Router();
const { getAllOffers, createOffer,claimOffer } = require('../controllers/offerController');
const { protect,isAdmin } = require('../middleware/authMiddleware'); 
// Route to get all offers
router.get('/', getAllOffers);

// Route to create a new offer
router.post('/',protect,isAdmin, createOffer);
// User claims an offer

router.post('/claim/:id', protect, claimOffer);
module.exports = router;
