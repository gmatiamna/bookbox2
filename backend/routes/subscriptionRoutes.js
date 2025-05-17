const express = require('express');
const router = express.Router();
const {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
} = require('../controllers/subscriptionController');

// You may want to protect these routes with admin middleware later
router.post('/', createSubscriptionPlan);
router.get('/', getAllSubscriptionPlans);
router.get('/:id', getSubscriptionPlanById);
router.put('/:id', updateSubscriptionPlan);
router.delete('/:id', deleteSubscriptionPlan);

module.exports = router;
