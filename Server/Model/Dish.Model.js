const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const dishSchema = new Schema({
    dishName: {
        type: String,
        required: true
    },
    dishMacros: {
        type: String,
        required: true
    },
    dishPrice: {
        type: String,
        required: true
    },
    dishDescription: {
        type: String,
        required: true
    },
    dishIngredients :{
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cusine: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

const Dishes = model('Dishes', dishSchema);
module.exports = Dishes;