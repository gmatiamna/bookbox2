const express = require('express');
const { registerUser, loginUser,logoutUser } = require('../controllers/authController');

const router = express.Router();

// POST request to register a new user
router.post('/signup', registerUser);
router.post('/logout', logoutUser);

// POST request to log in an existing user
router.post('/login', loginUser);

module.exports = router;