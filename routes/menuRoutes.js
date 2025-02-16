const express = require('express');
const MenuItemController = require('../controllers/MenuItemController');
const router = express.Router();

const menuItemController = new MenuItemController();

router.get('/', (req, res) => menuItemController.getAllMenuItems(req, res));
router.post('/', (req, res) => menuItemController.createMenuItem(req, res));
router.get('/:id', (req, res) => menuItemController.getMenuItemById(req, res));
router.put('/:id', (req, res) => menuItemController.updateMenuItem(req, res));
router.delete('/:id', (req, res) => menuItemController.deleteMenuItem(req, res));

module.exports = router;