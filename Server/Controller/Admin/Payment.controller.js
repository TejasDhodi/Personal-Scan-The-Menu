const paymentModel = require('../../Model/Payment.Model');

// -----------------------------Update Status Functions ---------------------------

// Utility Function for Status Update
const updateStatus = async (req, res, updatedFields, successMessage) => {
    try {
        const updatedOrders = await paymentModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        if (!updatedOrders) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or unable to update status'
            });
        }

        return res.status(200).json({
            success: true,
            message: successMessage,
            updatedOrders
        })
    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to update status',
            error: error.message
        });
    }
}

// To Update the status of pending to processing
const setProcessingStatusTrue = (req, res) => updateStatus(req, res,
    {
        delivered: false,
        processing: true,
        pending: false
    }, 'Status updated to processing'
)

// To Update the status of Processsing to sentToDelivery
const setSentToDeliveryStatusTrue = (req, res) => updateStatus(req, res, {
    sentToDelivery: true,
    delivered: false,
    processing: false,
    pending: false
}, 'Status updated to sent to delivery'
)

// To Update the status of sentToDelivery to Delivered
const setDeliveryStatusTrue = (req, res) => updateStatus(req, res, {
    delivered: true,
    sentToDelivery: false,
    processing: false,
    pending: false
}, 'Status updated to delivered'
)

// To Update the status of Delivered to processing
const setDeliveryStatusFalse = (req, res) => updateStatus(req, res, {
    delivered: false,
    sentToDelivery: true,
    processing: false,
    pending: false
}, 'Status updated to not delivered'
)

// To Update Status of Occupied Seat To False
const setUnOccupiedTable = (req, res) => updateStatus(req, res, {
    delivered: false,
    processing: false,
    pending: false,
    isTableOccupied: false,
    isPaymentDone: true
}, 'Table set to unoccupied'
)



// -------------------------------------Pagination  Functions ----------------------------------------

// Utility function for pagination on tables
const applyPaginationOnTable = async (req, res, filter) => {
    try {
        const { limit, page } = req.query;
        const orders = await paymentModel.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalOrders = await paymentModel.find(filter);

        return res.status(200).json({
            success: true,
            message: 'Pagination applied',
            result: {
                pageCount: Math.ceil(totalOrders.length / limit), 
                paginatedResult: orders,
                currentPage: page
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Pagination failed',
            error: error.message
        });
    }
}

// To Apply Pagination On Pending
const setPaginationOnPending = (req, res) => applyPaginationOnTable(req, res, { pending: true });


//  To Apply Pagination On Processing
const setPaginationOnProcessing = (req, res) => applyPaginationOnTable(req, res, { processing: true });

// To Apply Pagination on Sent to delivery
const setPaginationOnSentToDelivery = (req, res) => applyPaginationOnTable(req, res, { sentToDelivery: true });

// To Apply Pagination On Delivered 
const setPaginationOnDelivered = (req, res) => applyPaginationOnTable(req, res, { delivered: true });

// Pagination On Occupied Table 
const setPaginationOnOccupiedTable = (req, res) => applyPaginationOnTable(req, res, { isTableOccupied: true })



const getAllPaymentData = async (req, res) => {
    try {
        const paymentData = await paymentModel.find();
        return res.status(200).json({
            success: true,
            message: 'Received all payments data',
            paymentData
        })
    } catch (error) {
        console.log('Unable to get the payments data', error);
        res.status(500).jsno({
            success: false,
            message: 'Unable to get the payments data',
            error: error.message
        })
    }
}

module.exports = {
    setProcessingStatusTrue, setDeliveryStatusTrue, setSentToDeliveryStatusTrue, setDeliveryStatusFalse, setUnOccupiedTable,
    setPaginationOnProcessing, setPaginationOnPending, setPaginationOnSentToDelivery, setPaginationOnDelivered,
    setPaginationOnProcessing, setPaginationOnOccupiedTable, getAllPaymentData
};