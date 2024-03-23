const express = require('express');
const router = express.Router();
const {createDish, getDishData, updateDish, deleteDish, serachDish, typesOfDishes, getSingleDishData} = require('../../Controller/Admin/Dishes.Controller')
const upload = require('../../Middlewares/Multer.Middleware');

router.route('/dishes').get(getDishData);
router.route('/dishes/:id').get(getSingleDishData);
router.route('/dishes/search').get(serachDish);
router.route('/dishes/filter/check').post(typesOfDishes);
router.route('/createDish').post(upload, createDish);
router.route('/dishes/update/:id').put(upload, updateDish)
router.route('/dishes/delete/:id').delete(deleteDish);

module.exports = router;