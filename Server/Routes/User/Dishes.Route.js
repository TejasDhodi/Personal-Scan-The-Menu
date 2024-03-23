const express = require('express');
const { handleRecentOrders } = require('../../Controller/User/Dishes.Controller');
const router = express.Router();

router.get('/recentOrders/:user', handleRecentOrders);

module.exports = router;