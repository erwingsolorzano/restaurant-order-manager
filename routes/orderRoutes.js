const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

const orderController = new OrderController(); // Instancia del controlador

router.post('/', (req, res) => orderController.createOrder(req, res));
router.get('/', (req, res) => orderController.getOrders(req, res));

module.exports = router;
