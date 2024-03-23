const express = require('express');
const { setDeliveryStatusTrue, setDeliveryStatusFalse, setPaginationOnPending, setPaginationOnDelivered, getAllPaymentData, setProcessingStatusTrue, setPaginationOnProcessing, setOrderAsPaid, setPaginationOnOccupiedTable } = require('../../Controller/Admin/Payment.controller');
const { handleOccupiedTable } = require('../../Controller/User/Payment.controller');
const router = express.Router();

// router.route('/orders/pending').get(getpendingOreders);
// router.route('/orders/delivered').get(getDeliveredOrders);

router.put('/orders/processing/:id', setProcessingStatusTrue)
router.route('/orders/delivered/:id').put(setDeliveryStatusTrue);
router.route('/orders/undoDelivered/:id').put(setDeliveryStatusFalse);
router.route('/orders/markPaid/:id').put(setOrderAsPaid);

router.route('/orders/pending').get(setPaginationOnPending);
router.get('/orders/processing', setPaginationOnProcessing);
router.route('/orders/delivered').get(setPaginationOnDelivered);
router.route('/orders/paid').get(setPaginationOnOccupiedTable);

router.get('/paymentData', getAllPaymentData);
router.get('/occupied', handleOccupiedTable)

module.exports = router;