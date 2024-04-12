const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    user: {
        type: String
    },
    orderedDish: {
        type: Object
    },
    amount: {
        type: Number
    },
    order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_order_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    },
    tableNo: {
        type: Number,
        required: true,
    },
    isTableOccupied: {
        type: Boolean,
        default: false,
    },
    pending: {
        type: Boolean,
        default: false
    },
    processing: {
        type: Boolean,
        default: false
    },
    sentToDelivery: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    }
    
    
}, {
    timestamps: true
});

const paymentModel = model('paymentModel', paymentSchema);

module.exports = paymentModel;