const express = require('express');
const { body, validationResult } = require('express-validator');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

const orderController = new OrderController();

router.post(
  '/',
  // Validations
  [
    body('menuItem')
      .isString()
      .withMessage('menuItem must be a string.')
      .notEmpty()
      .withMessage('menuItem can not be empty.'),
    body('quantity')
      .isInt({ gt: 0 })
      .withMessage('quantity must be a number and greater than zero.')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    orderController.createOrder(req, res);
  }
);

router.get('/', (req, res) => orderController.getOrders(req, res));

router.delete('/:id', (req, res) => orderController.deleteOrder(req, res));

module.exports = router;
