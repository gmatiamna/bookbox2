const SubscriptionPlan = require('../models/SubscriptionPlan');

// Create a new subscription plan
const createSubscriptionPlan = async (req, res) => {
  try {
    const { name, price, duration_days, benefits } = req.body;

    if (!name || !price || !duration_days || !benefits) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existing = await SubscriptionPlan.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'This subscription plan already exists.' });
    }

    const newPlan = new SubscriptionPlan({ name, price, duration_days, benefits });
    await newPlan.save();

    res.status(201).json({ message: 'Subscription plan created', plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error: error.message });
  }
};

// Get all subscription plans
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ duration_days: 1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
};

// Get a plan by ID
const getSubscriptionPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plan', error: error.message });
  }
};

// Update a plan
const updateSubscriptionPlan = async (req, res) => {
  try {
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });

    res.status(200).json({ message: 'Plan updated', plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan', error: error.message });
  }
};

// Delete a plan
const deleteSubscriptionPlan = async (req, res) => {
  try {
    const deleted = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Plan not found' });

    res.status(200).json({ message: 'Subscription plan deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error: error.message });
  }
};

module.exports = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
};
