const express = require('express');
const router = express.Router();
const adminAuth = require('../../Controller/Admin/AdminAuth.controller');

router.route("/adminAuth").post(adminAuth);

module.exports = router;