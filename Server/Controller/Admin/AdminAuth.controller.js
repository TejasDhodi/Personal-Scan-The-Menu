const adminCredentials = require('../../Utils/AdminCredentials');

const adminAuthController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminCredentials.find((credential) => credential.email === email && credential.password === password)

        if (admin) {
            res.status(200).json({
                success: true,
                message: "Login Successfull",
                adminAuthToken: req.token
            });
        } 
    } catch (error) {
        console.error("Error in adminAuthController:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = adminAuthController;