const express = require('express');
const router = express.Router();
const {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,assignPlanToUser,checkActiveSubscription
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware'); 
// You may want to protect these routes with admin middleware later
router.post('/', createSubscriptionPlan);
router.get('/', getAllSubscriptionPlans);

router.post("/add-plan",protect, assignPlanToUser);  

router.get('/active', protect, checkActiveSubscription);
router.get('/:id', getSubscriptionPlanById);
router.put('/:id', updateSubscriptionPlan);
router.delete('/:id', deleteSubscriptionPlan);
module.exports = router;
