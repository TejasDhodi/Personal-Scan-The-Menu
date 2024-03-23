const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
});


// Hash Password
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password') || !user.isModified('confirmPassword')) {
        next();
    }

    try {
        const saltRound = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(user.password, saltRound);
        const hashConfirmPassword = await bcryptjs.hash(user.confirmPassword, saltRound);

        user.password = hashPassword;
        user.confirmPassword = hashConfirmPassword;

    } catch (error) {
        next(error)
    }
})

// Generate Auth Token

userSchema.methods.gererateToken = async function () {
    try {

        return jwt.sign({
            userId: this._id.toString(),
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '2d'
        })

    } catch (error) {
        console.log('JWT Error ', error);
    }
}

const userModel = model('RegisteredUser', userSchema);
module.exports = userModel;