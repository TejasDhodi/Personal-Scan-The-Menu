const jwt = require('jsonwebtoken');
const userModel = require('../Model/User.Model')

const generateToken = async (req, res, next) => {
    try {
        const {email} = req.body;

        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY,{
            expiresIn: '30d'
        })

        req.token = token
        console.log('Generated Token : ', token);

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = generateToken;