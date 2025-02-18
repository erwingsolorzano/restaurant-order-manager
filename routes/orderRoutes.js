const express = require('express');
const { validationResult } = require('express-validator');
const OrderController = require('../controllers/OrderController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');


const orderController = new OrderController();

router.post('/', authMiddleware, (req, res) => orderController.createOrder(req, res));
router.get('/', authMiddleware, (req, res) => orderController.getOrders(req, res));
router.delete('/:id', authMiddleware, (req, res) => orderController.deleteOrder(req, res));
router.put('/:id/status', authMiddleware, (req, res) => orderController.updateOrderStatus(req, res));

module.exports = router;
