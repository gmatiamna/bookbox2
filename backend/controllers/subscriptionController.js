// controllers/subscriptionController.js
const UserSubscription = require('../models/UserSubscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User'); 
const checkActiveSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
console.log("User ID from token:", req.user._id);

    const activeSubscription = await UserSubscription.findOne({
      userId: userId,
      status: 'active',
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    if (activeSubscription) {
      return res.json({ hasActiveSubscription: true });
    } else {
      return res.json({ hasActiveSubscription: false });
    }
  } catch (err) {
    console.error('Error checking subscription:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
const assignPlanToUser = async (req, res) => {
 try {
    const userId = req.user._id;
    const { planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ message: "User ID and Plan ID are required" });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    const userSubscription = new UserSubscription({
      userId: userId,
      plan: planId,
      startDate,
      endDate,
      status: 'active',
    });

    await userSubscription.save();

    res.status(200).json({ message: 'Plan assigned successfully', userSubscription });
  } catch (error) {
    console.error("❌ assignPlanToUser error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new subscription plan
const createSubscriptionPlan = async (req, res) => {
  try {
    const { name, price, durationDays, benefits } = req.body;

    if (!name || !price || !durationDays || !benefits) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existing = await SubscriptionPlan.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'This subscription plan already exists.' });
    }

    const newPlan = new SubscriptionPlan({ name, price, durationDays, benefits });
    await newPlan.save();

    res.status(201).json({ message: 'Subscription plan created', plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error: error.message });
  }
};

// Get all subscription plans
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ durationDays: 1 });
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
  deleteSubscriptionPlan,assignPlanToUser,checkActiveSubscription
};
