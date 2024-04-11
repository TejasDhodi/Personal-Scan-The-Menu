const paymentModel = require('../../Model/Payment.Model');

// To Update the status of pending to processing
const setProcessingStatusTrue = async (req, res) => {
    try {
        const setStatusTrue = await paymentModel.findByIdAndUpdate(req.params.id,
            {
                delivered: false,
                processing: true,
                pending: false
            },
            { new: true }
        )

        if (!setStatusTrue) {
            return res.status(404).json({
                success: false,
                message: 'Unable to set status true or order not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Status Updated to True',
            setStatusTrue
        })

    } catch (error) {
        console.log('Unable to Update delivered status : ', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update delivery status',
            error: error.message
        });
    }
}


// To Update the status of Processsing to sentToDelivery
const setSentToDeliveryStatusTrue = async (req, res) => {
    try {
        const setStatusTrue = await paymentModel.findByIdAndUpdate(req.params.id,
            {

                sentToDelivery: true,
                delivered: false,
                processing: false,
                pending: false
            },
            { new: true }
        )

        if (!setStatusTrue) {
            return res.status(404).json({
                success: false,
                message: 'Unable to set status true or order not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Status Updated to True',
            setStatusTrue
        })

    } catch (error) {
        console.log('Unable to Update delivered status : ', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update delivery status',
            error: error.message
        });
    }
}

// To Update the status of sentToDelivery to Delivered
const setDeliveryStatusTrue = async (req, res) => {
    try {
        const setStatusTrue = await paymentModel.findByIdAndUpdate(req.params.id,
            {
                delivered: true,
                sentToDelivery: false,
                processing: false,
                pending: false
            },
            { new: true }
        )

        if (!setStatusTrue) {
            return res.status(404).json({
                success: false,
                message: 'Unable to set status false or order not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Status Updated to false',
            setStatusTrue
        })

    } catch (error) {
        console.log('Unable to Update delivered status : ', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update delivery status',
            error: error.message
        });
    }
}

// To Update the status of Delivered to processing
const setDeliveryStatusFalse = async (req, res) => {
    try {
        const setStatusTrue = await paymentModel.findByIdAndUpdate(req.params.id,
            {
                delivered: false,
                sentToDelivery: true,
                processing: false,
                pending: false
            },
            { new: true }
        )

        if (!setStatusTrue) {
            return res.status(404).json({
                success: false,
                message: 'Unable to set status false or order not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Status Updated to false',
            setStatusTrue
        })

    } catch (error) {
        console.log('Unable to Update delivered status : ', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update delivery status',
            error: error.message
        });
    }
}

// To Update Status of Occupied Seat To False
const setUnOccupiedTable = async (req, res) => {
    try {
        const setStatusTrue = await paymentModel.findByIdAndUpdate(req.params.id,
            {
                delivered: false,
                processing: false,
                pending: false,
                isTableOccupied: false,
                isPaymentDone: true
            },
            { new: true }
        )

        if (!setStatusTrue) {
            return res.status(404).json({
                success: false,
                message: 'Unable to set status false or order not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Status Updated to false',
            setStatusTrue
        })

    } catch (error) {
        console.log('Unable to Update delivered status : ', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update delivery status',
            error: error.message
        });
    }
}


// To Apply Pagination On Pending
const setPaginationOnPending = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const orders = await paymentModel.find({ pending: true });

        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;

        const result = {};
        result.totalOrders = orders.length;
        result.pageCount = Math.ceil(orders.length / limit)

        if (lastIndex < orders.length) {
            result.next = {
                page: page + 1
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1
            }
        }

        result.paginatedResult = orders.slice(startIndex, lastIndex)

        res.status(200).json({
            success: true,
            message: 'Pagination Applied',
            result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Pagination Failed',
            error: error.message
        })
    }
}


// To Apply Pagination On Processing
const setPaginationOnProcessing = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const orders = await paymentModel.find({ processing: true });
        console.log(orders.length);

        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;

        const result = {};
        result.totalOrders = orders.length;
        result.pageCount = Math.ceil(orders.length / limit)

        if (lastIndex < orders.length) {
            result.next = {
                page: page + 1
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1
            }
        }

        result.paginatedResult = orders.slice(startIndex, lastIndex)

        res.status(200).json({
            success: true,
            message: 'Pagination Applied',
            result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Pagination Failed',
            error: error.message
        })
    }
}

// To Apply Pagination on Sent to delivery
const setPaginationOnSentToDelivery = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const orders = await paymentModel.find({ sentToDelivery: true });
        console.log(orders.length);

        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;

        const result = {};
        result.totalOrders = orders.length;
        result.pageCount = Math.ceil(orders.length / limit)

        if (lastIndex < orders.length) {
            result.next = {
                page: page + 1
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1
            }
        }

        result.paginatedResult = orders.slice(startIndex, lastIndex)

        res.status(200).json({
            success: true,
            message: 'Pagination Applied',
            result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Pagination Failed',
            error: error.message
        })
    }
}

// To Apply Pagination On Delivered
const setPaginationOnDelivered = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const orders = await paymentModel.find({ delivered: true });
        console.log(orders.length);

        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;

        const result = {};
        result.totalOrders = orders.length;
        result.pageCount = Math.ceil(orders.length / limit)

        if (lastIndex < orders.length) {
            result.next = {
                page: page + 1
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1
            }
        }

        result.paginatedResult = orders.slice(startIndex, lastIndex)

        res.status(200).json({
            success: true,
            message: 'Pagination Applied',
            result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Pagination Failed',
            error: error.message
        })
    }
}

// Pagination On Occupied Table
const setPaginationOnOccupiedTable = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const orders = await paymentModel.find({ isTableOccupied: true });
        console.log('Total occupied orders:', orders.length);

        const totalOrders = orders.length;
        const pageCount = Math.ceil(totalOrders / limit);

        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, totalOrders); // Ensure endIndex does not exceed totalOrders

        const paginatedResult = orders.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            message: 'Pagination Applied',
            result: {
                totalOrders,
                pageCount,
                paginatedResult: orders
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Pagination Failed',
            error: error.message
        });
    }
};


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