const nodemailer = require('nodemailer');

const storedOtp = new Map();

const sendMail = async (req, res) => {
    try {
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_USER_PASS
            }
        })

        const { email } = req.body;
        const otp = Math.floor(Math.random() * 9000 + 1000);

        // Mail Details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Scan the Menu OTP verification",
            html: ` <h1>Do Not Share With any one</h1>
            <p>Your OTP for login is: <strong>${otp}</strong></p>
            `
        }

        // Send Mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
                res.status(500).json({ success: false, error: error.message });
            } else {
                console.log(`Otp Sent on :  ${email}`);
                storedOtp.set(email, { otp })
                return res.status(200).json({
                    success: true,
                    message: `Otp Sent on :  ${email}`,
                    otp
                })
            }
        })

    } catch (error) {
        console.log('Send mail error');
        return res.status(500).json({
            success: false,
            message: 'Send mail error',
            error: error.message
        })
    }
};

const verifyMail = async (req, res) => {
    try {
        const { email, enteredOtp } = req.body;
        const sentOtp = storedOtp.get(email);

        console.log("sentOtp : ", storedOtp);

        if (!sentOtp || sentOtp.otp !== enteredOtp) {
            return res.status(404).json({
                success: false,
                message: 'invalid otp'
            })
        } else {
             res.status(200).json({
                userId: req.userId,
                success: true,
                message: 'Email Verified',
                token: req.token,
            });
            storedOtp.delete(email)
        }

    } catch (error) {
        console.log('Send mail error');
        return res.status(500).json({
            success: false,
            message: 'Send mail error',
            error: error.message
        })
    }
}

module.exports = { sendMail, verifyMail }