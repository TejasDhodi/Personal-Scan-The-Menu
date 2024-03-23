const jwt = require('jsonwebtoken');
const userModel = require('../Model/User.Model');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log('Authorization Header Token : ', token);

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided or malformed'
            });
        }

        const jwtToken = token.replace('Bearer', '').trim();
        console.log('Bearer Replaced Token : ', jwtToken);

        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log('Verified Successfully');

        const userData = await userModel.findOne({ _id: decoded.userId });
        console.log("UserData Verified", userData);
        req.userData = userData;
        req.userToken = token;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to verify JSON Web Token',
            error: error.message
        });
    }
}

module.exports = verifyToken;