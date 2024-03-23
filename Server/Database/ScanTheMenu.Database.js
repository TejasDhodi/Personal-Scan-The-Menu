const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connection Established');
    } catch (error) {
        console.log('Unable To Connect Database from Database', error);
    }
}

module.exports = connectToDatabase;