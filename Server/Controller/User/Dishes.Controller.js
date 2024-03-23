const paymentModel = require('../../Model/Payment.Model');


const handleRecentOrders = async (req, res) => {
    try {
        const { user } = req.params;
        const recentOrders = await paymentModel.find({ user });

        if(!recentOrders) {
            return res.status(404).json({
                success: false,
                message: 'Order Not Availab;e',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'found recent of this user',
            recentOrders
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch the recent orders',
            error: error.message
        })
    }
};

module.exports = { handleRecentOrders }