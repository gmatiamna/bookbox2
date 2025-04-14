const express = require('express');
const router = express.Router();
const { signupAdmin } = require('../controllers/adminController');

// Routes
router.post('/signup-admin', signupAdmin);

module.exports = router;
