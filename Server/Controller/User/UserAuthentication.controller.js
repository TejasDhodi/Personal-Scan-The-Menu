const userModel = require("../../Model/User.Model");
const bcryptjs = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { email, phone, fullName, password, confirmPassword } = req.body;

        const emailExist = await userModel.findOne({ email });
        const phoneExist = await userModel.findOne({ phone });

        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exist"
            })
        } else if (phoneExist) {
            return res.status(400).json({
                success: false,
                message: "Phone Number Already Exist",
            })
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both Password Should Match"
            })
        }

        const user = await userModel.create({
            email,
            phone,
            fullName,
            password,
            confirmPassword
        })

        return res.status(201).json({
            success: true,
            message: 'Registration Successful',
            userId: user._id.toString(),
            userName: user.fullName.toString(),
            userData: req.userData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            meaasge: 'Unable to register user',
            error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email });

        if (!userExist) {
            console.log('No User Fount Asssociated with this Email');
            return res.status(404).json({
                success: false,
                message: 'No User Fount Asssociated with this Email'
            })
        }

        const comparePassword = bcryptjs.compare(password, userExist.password);

        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Login Successfull",
                token: await userExist.gererateToken(),
                userId: userExist._id
            })
        }

    } catch (error) {
        console.error('Error While Loggong User:', error);
        res.status(500).json({
            success: false,
            message: 'Login Error',
            error: error.message
        });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userData = req.userData;
        console.log('userData profile: ', userData);

        const token = req.token;
        console.log('Token profile: ', token);

        return res.status(200).json({
            verifiedUser: userData,
            success: true,
            message: 'User Verified'
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Unable to getProfile',
            error: error.message
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({
            success: true,
            message: 'Users Found',
            users
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Unable to get all user data',
            error: error.message
        })
    }
}

module.exports = { registerUser, loginUser, getUserProfile, getAllUser };