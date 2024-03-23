const dishModel = require('../../Model/Dish.Model');
const uploadToCloudinary = require('../../Utils/Cloudinary');

// Post Request
const createDish = async (req, res) => {
    try {
        const { dishName, dishMacros, dishPrice, dishDescription, dishIngredients, type, category, quantity, cusine } = req.body;
        const image = req.files?.file[0]?.path;

        if (!dishName || !dishMacros || !dishPrice || !dishDescription || !image || !type || !category || !cusine) {
            res.status(400).json({
                message: 'All Fields Are Required'
            })
        }

        const imageUrl = await uploadToCloudinary(image);

        const dishData = await dishModel.create({
            dishName,
            dishMacros,
            dishPrice,
            dishDescription,
            dishIngredients,
            file: imageUrl.url,
            type,
            category,
            cusine,
            quantity: 1
        })

        console.log(dishData);
        return res.status(201).json({
            success: true,
            message: 'Dish Added',
            addedDish: dishData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to create dish Internal error',
            error: error.message
        })
    }
}

// To Get all the added dish data
const getDishData = async (req, res) => {
    const dishdata = await dishModel.find();
    res.status(200).json({
        dishdata: dishdata
    });
}

// Get Single Dish Data
const getSingleDishData = async (req, res) => {
    try {
        const { id } = req.params;
        const dishdata = await dishModel.findById(id);

        if (!dishdata) {
            return res.status(404).json({ error: "Dish not found" });
        }

        return res.status(200).json({
            success: true,
            message: 'Found Dish Associated with this id',
            dishdata
        });
    } catch (error) {
        console.error("Error fetching dish data:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// Update Request
const updateDish = async (req, res) => {
    try {
        const { dishName, dishMacros, dishPrice, dishDescription, dishIngredients, type, category } = req.body;
        const image = req.files?.file[0]?.path;

        if (!dishName || !dishMacros || !dishPrice || !dishDescription || !image || !type || !category) {
            res.status(400).json({
                message: 'All Fields Are Required'
            })
        }

        const imageUrl = await uploadToCloudinary(image);

        const updatedDish = await dishModel.findByIdAndUpdate(req.params.id, {
            dishName,
            dishMacros,
            dishPrice,
            dishDescription,
            dishIngredients,
            file: imageUrl.url,
            type,
            category
        });

        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' })
        }
        res.status(200).json({ 
            success: true,
            message: 'Dish Updated',
            updatedDish })
    } catch (error) {
        console.error('Unable to update Dish:', error);
        res.status(500).json({ message: 'Unable to Update the Dish' });
    }
};

// Delete Dish
const deleteDish = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDish = await dishModel.findByIdAndDelete({ _id: id });
        res.status(200).json({ deletedDish })
    } catch (error) {
        res.status(500).json("Unable to delete Dish")
    }
}

// Search Dish
const serachDish = async (req, res) => {
    try {
        const { search } = req.query;
        const searchedDish = await dishModel.find({ "dishName": { $regex: new RegExp(search, 'i') } })
        return res.status(200).json({
            success: true,
            message: "Search Working",
            results: searchedDish
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "Search Not Working",
            error: error
        })
    }
}

// Types Of Dishes
const typesOfDishes = async (req, res) => {
    try {
        const { checkedItem, selectCategory, price } = req.body;

        let arguments = {};

        if (checkedItem && checkedItem.length > 0) arguments.cusine = checkedItem;
        if (selectCategory && selectCategory.length > 0) arguments.category = selectCategory;

        if (price && price !== 0) {
            arguments.dishPrice = { $lt: Number(price) };
        }

        const dishes = await dishModel.find(arguments);
        return res.status(200).json({
            success: true,
            dishes
        })

    } catch (error) {
        console.log('Error while filtering the products : ', error);
        return res.status(500).json({
            success: false,
            message: 'Error while filtering the products',
            error: error.message
        })
    }
}

module.exports = { createDish, getDishData, getSingleDishData, updateDish, deleteDish, serachDish, typesOfDishes };