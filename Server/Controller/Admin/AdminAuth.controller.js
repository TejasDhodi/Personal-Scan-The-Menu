const adminCredentials = require('../../Utils/AdminCredentials');

const adminAuthController = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const admin = await adminCredentials.find((credential) => credential.userName === userName && credential.password === password)

        if (admin) {
            res.status(201).json({
                success: true,
                message: "Login Successfull"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Login Credentials"
            });
        }
    } catch (error) {
        console.error("Error in adminAuthController:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = adminAuthController;