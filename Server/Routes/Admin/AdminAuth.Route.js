const express = require('express');
const router = express.Router();
// const adminAuth = require('../../Controller/Admin/AdminAuth.controller');
const adminAuthController = require('../../Controller/Admin/AdminAuth.controller');
const generateToken = require('../../Middlewares/GenerateToken.Middleware');

router.post("/adminAuth", generateToken, adminAuthController);

module.exports = router;