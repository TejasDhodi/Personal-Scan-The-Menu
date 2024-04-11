const express = require('express');
const { handlePlaceOrder, getSinglePayment } = require('../../Controller/User/Payment.controller');
const router = express.Router();

router.post('/placeOrder', handlePlaceOrder)
router.get('/placeOrder/detail/:id', getSinglePayment)

module.exports = router;