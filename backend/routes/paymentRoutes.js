const express = require('express');
const { Add, Verify, AddSub } = require('../controllers/paymentcontroller');


const router = express.Router();


router.post("/subscribe",AddSub)

router.post("/payment",Add)
router.get("/verify-payment/:id", Verify);



module.exports = router;
