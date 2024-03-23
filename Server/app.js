const dotenv = require('dotenv');
dotenv.config({path: "./Config/config.env"})
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./Database/ScanTheMenu.Database');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Route Importing
const adminAuthRoute = require('./Routes/Admin/AdminAuth.Route');
const dishesRoute = require('./Routes/Admin/Dishes.Routes');
// const paymentRoute = require('./Routes/User/Payment.routes');
const paymentRoute = require('./Routes/User/Payment.Routes');
const orderRoute = require('./Routes/Admin/Payment.Route');
const sendVerifyMail = require('./Routes/User/SendVerifyEmail.Routes');
const UserAuthentication = require('./Routes/User/UserAuthentication.Routes');
const userDishesRoute = require('./Routes/User/Dishes.Route');

// Route Declaration
app.use('/api/v1', adminAuthRoute);
app.use('/api/v1', dishesRoute);
app.use('/api/v1', paymentRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', sendVerifyMail);
app.use('/api/v1', UserAuthentication);
app.use('/api/v1', userDishesRoute);


database().then(
    app.listen(process.env.PORT, () => {
        console.log("Jay Shree Ram");
    })
)