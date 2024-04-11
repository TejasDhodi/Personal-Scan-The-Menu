const express = require('express');
const router = express.Router();
const {createDish, getDishData, updateDish, deleteDish, serachDish, typesOfDishes, getSingleDishData} = require('../../Controller/Admin/Dishes.Controller')
const upload = require('../../Middlewares/Multer.Middleware');

router.get('/dishes', getDishData);
router.get('/dishes/:id', getSingleDishData);
router.get('/dishes/search', serachDish);
router.post('/dishes/filter/check', typesOfDishes);
router.post('/createDish', upload, createDish);
router.put('/dishes/update/:id', upload, updateDish)
router.delete('/dishes/delete/:id', deleteDish);

module.exports = router;