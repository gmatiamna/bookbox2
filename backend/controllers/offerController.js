
const Offer = require('../models/Offer');
const Book = require('../models/Book'); 
const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch offers', error: err });
  }
};



const createOffer = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      discount,
      bookId,
      condition,
      days_active,
      requires_verification,
      duration_days,
    } = req.body;

    if (!title || !description || !type || !discount || !bookId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the new offer
    const offer = new Offer({
      title,
      description,
      type,
      discount,
      condition,
      days_active,
      requires_verification,
      duration_days,
      createdBy: req.user._id,
      book: bookId,
    });

    // Apply discount to the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const discountedPrice = Math.round(book.prix_achat * (1 - discount / 100));
    book.discountedPrice = discountedPrice;
  
    await book.save();

    await offer.save();

    res.status(201).json({
      message: 'Offer created and discount applied to book',
      offer,
      updatedBook: book,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User claims an offer
const claimOffer = async (req, res) => {
  try {
    const offerId = req.params.id;

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    const user = await User.findById(req.user._id);
    user.claimedOffer = offerId;
    await user.save();

    res.status(200).json({ message: 'Offer claimed successfully', offer });
  } catch (error) {
    console.error('Error claiming offer:', error);
    res.status(500).json({ message: 'Server error' });
  }};
  const getBooksWithActiveOffers = async (req, res) => {
    try {
      const today = new Date();
      const currentDay = today.toLocaleString('en-US', { weekday: 'long' }); // e.g. "Monday"
  
      const offers = await Offer.find({})
        .populate('book')
        .lean();
  
      const activeBooks = offers.filter(offer => {
        const createdAt = new Date(offer.createdAt);
        let isActive = false;
  
        if (offer.duration_days) {
          const expiresAt = new Date(createdAt.getTime() + offer.duration_days * 24 * 60 * 60 * 1000);
          isActive = today <= expiresAt;
        }
  
        if (offer.days_active && Array.isArray(offer.days_active)) {
          if (offer.days_active.includes(currentDay)) {
            isActive = true;
          }
        }
  
        return isActive && offer.book && offer.book.discountedPrice;
      }).map(offer => offer.book);
  
      res.status(200).json(activeBooks);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books with active offers', error: error.message });
    }
  };
module.exports = { getAllOffers, createOffer,claimOffer,getBooksWithActiveOffers };
