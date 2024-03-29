const express = require('express');
const router = express.Router();
// const adminAuth = require('../../Controller/Admin/AdminAuth.controller');
const adminAuthController = require('../../Controller/Admin/AdminAuth.controller');
const generateToken = require('../../Middlewares/GenerateToken.Middleware');

router.route("/adminAuth").post(generateToken, adminAuthController);

module.exports = router;