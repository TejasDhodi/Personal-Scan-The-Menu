const express = require('express');
const { handlePlaceOrder, getSinglePayment, handlePlaceOrderOnline, handleVerifyOnlinePayment } = require('../../Controller/User/Payment.controller');
const router = express.Router();

router.post('/placeOrder/online', handlePlaceOrderOnline);
router.post('/placeOrder/online/verify', handleVerifyOnlinePayment);
router.post('/placeOrder', handlePlaceOrder)
router.get('/placeOrder/detail/:id', getSinglePayment)

module.exports = router;