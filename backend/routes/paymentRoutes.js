const express = require('express');
const { Add, Verify } = require('../controllers/paymentcontroller');


const router = express.Router();




router.post("/payment",Add)
router.post("/payment/:id",Verify)


module.exports = router;
