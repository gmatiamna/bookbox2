
const Offer = require('../models/Offer');

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
      const { title, description, type, discount, condition, days_active, requires_verification, duration_days } = req.body;
  
      if (!title || !description || !type || !discount) {
        return res.status(400).json({ message: 'Title, description, type, and discount are required' });
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
        createdBy: req.user._id, // Admin user creating the offer
      });
  
      // Save the offer to the database
      await offer.save();
  
      res.status(201).json({
        message: 'Offer created successfully',
        offer,
      });
    } catch (error) {
      console.error('❌ Error creating offer:', error);
      res.status(500).json({
        message: 'Server error',
        error: error.message || error,
      });
    }
  };

module.exports = { getAllOffers, createOffer };
