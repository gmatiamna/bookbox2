const express = require('express');
const router = express.Router();
const {
    createBook 
} = require('../controllers/bookController');



// Routes
router.post('/createBook ', createBook );

module.exports = router;
