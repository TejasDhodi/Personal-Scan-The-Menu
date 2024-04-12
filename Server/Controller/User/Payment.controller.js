const Razorpay = require('razorpay');
const paymentModel = require('../../Model/Payment.Model');

const crypto = require('crypto');

var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});



const handlePlaceOrderOnline = async (req, res) => {
    try {
        const { user, orderedDish, amount, delivered, processing, tableNo } = req.body;

        var options = {
            amount: Number(amount * 100),  // amount in the smallest currency unit
            currency: "INR",
        };

        const order = await instance.orders.create(options)

        const orderData = await paymentModel.create({
            order_id: order.id,
            user,
            orderedDish,
            amount,
            processing,
            delivered,
            tableNo
        })

        return res.status(201).json({
            success: true,
            message: 'Online Payment data',
            orderData
        })

    } catch (error) {
        console.log('Unable to post Payment data form handlePlaceOrderOnline : ', error);

        return res.status(500).json({
            success: false,
            message: 'Online Payment data fail',
            error: error.message
        })
    }
}

const handleVerifyOnlinePayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

        const text = `${razorpay_order_id}|${razorpay_payment_id}`;

        const generatedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET).update(text).digest('hex');

        if (generatedSignature === razorpay_signature) {

            const updatedData = await paymentModel.findOneAndUpdate({ order_id: razorpay_order_id }, {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                pending: true,
                isTableOccupied: true,
                isPaymentDone: true
            })
            return res.redirect(`https://personal-scan-the-menu.vercel.app/success?payment_id=${razorpay_payment_id}&payment=${updatedData._id}`);
        }

        return res.redirect('https://personal-scan-the-menu.vercel.app/fail')

    } catch (error) {
        console.log('Unable to Verify Payment data form controller : ', error);

        return res.status(500).json({
            success: false,
            message: 'Online Payment Verification fail',
            error: error.message
        })
    }
}

const handlePlaceOrder = async (req, res) => {

    try {
        const { user, orderedDish, amount, delivered, pending, processing, order_id, tableNo, isTableOccupied } = req.body;

        const orderData = await paymentModel.create({
            order_id,
            user,
            orderedDish,
            amount,
            pending: true,
            processing,
            delivered,
            tableNo,
            isTableOccupied: true
        })

        return res.status(201).json({
            success: true,
            message: 'Payment data',
            orderData
        })

    } catch (error) {
        console.log('Unable to post Payment data form controller : ', error);

        return res.status(500).json({
            success: false,
            message: 'Payment data fail',
            error: error.message
        })
    }
};

const getSinglePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const singlePayment = await paymentModel.findById(id);
        return res.status(200).json({
            success: true,
            message: 'Received payment',
            singlePayment
        });
    } catch (error) {
        console.log('Unable to Get Single Payment data from controller : ', error);

        return res.status(500).json({
            success: false,
            message: 'Payment Fetching failed',
            error: error.message
        });
    }
};

const handleOccupiedTable = async (req, res) => {
    try {
        const getTableNo = await paymentModel.find({ isTableOccupied: true });
        res.status(200).json({
            getTableNo
        })
        console.log(getTableNo.map(item => item.tableNo));
    } catch (error) {

    }
}


module.exports = { handlePlaceOrderOnline, handleVerifyOnlinePayment, handlePlaceOrder, getSinglePayment, handleOccupiedTable }