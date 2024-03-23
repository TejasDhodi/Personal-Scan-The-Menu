const express = require('express');
const {registerUser, loginUser, getUserProfile, getAllUser} = require('../../Controller/User/UserAuthentication.controller');
const validate = require('../../Middlewares/Validate.Middleware')
const registerValidatorSchema = require('../../Validators/Register.Validator');
const verifyToken = require('../../Middlewares/VerifyToken.Middleware');
const generateToken = require('../../Middlewares/GenerateToken.Middleware');
const router = express.Router();

router.post('/register', [validate(registerValidatorSchema), verifyToken],  registerUser);
router.post('/login', verifyToken, generateToken, loginUser)
router.get('/userProfile', verifyToken, getUserProfile)
router.get('/allUsers', getAllUser)

module.exports = router;