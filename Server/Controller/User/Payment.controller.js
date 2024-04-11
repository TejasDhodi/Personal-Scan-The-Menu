const paymentModel = require('../../Model/Payment.Model');

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


module.exports = { handlePlaceOrder, getSinglePayment, handleOccupiedTable }