const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const categoryController = new CategoryController();

router.get('/', (req, res) => categoryController.getCategories(req, res));
router.post('/', (req, res) => categoryController.createCategory(req, res));

module.exports = router;
