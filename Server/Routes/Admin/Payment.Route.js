const express = require('express');
const { setDeliveryStatusTrue, setSentToDeliveryStatusTrue, setPaginationOnPending, setPaginationOnDelivered, getAllPaymentData, setProcessingStatusTrue, setPaginationOnProcessing, setUnOccupiedTable, setPaginationOnOccupiedTable, setPaginationOnSentToDelivery, setDeliveryStatusFalse } = require('../../Controller/Admin/Payment.controller');
const { handleOccupiedTable } = require('../../Controller/User/Payment.controller');
const router = express.Router();


router.put('/orders/processing/:id', setProcessingStatusTrue)
router.put('/orders/delivered/:id', setDeliveryStatusTrue);
router.put('/orders/sentToDelivery/:id', setSentToDeliveryStatusTrue);
router.put('/orders/undoDelivered/:id', setDeliveryStatusFalse);
router.put('/orders/markPaid/:id', setUnOccupiedTable);

router.get('/orders/pending', setPaginationOnPending);
router.get('/orders/processing', setPaginationOnProcessing);
router.get('/orders/sentToDelivery', setPaginationOnSentToDelivery);
router.get('/orders/delivered', setPaginationOnDelivered);
router.get('/orders/paid', setPaginationOnOccupiedTable);

router.get('/paymentData', getAllPaymentData);
router.get('/occupied', handleOccupiedTable)

module.exports = router;