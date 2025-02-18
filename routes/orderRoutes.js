const express = require('express');
const { body, validationResult } = require('express-validator');
const OrderController = require('../controllers/OrderController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');


const orderController = new OrderController();

router.post(
  '/',
  // Validations
  [
    body('menuItemId')
      .isInt({ gt: 0 })
      .withMessage('quantity must be a number and greater than zero.')
      .notEmpty()
      .withMessage('menuItem can not be empty.'),
    body('quantity')
      .isInt({ gt: 0 })
      .withMessage('quantity must be a number and greater than zero.'),
      authMiddleware
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    orderController.createOrder(req, res);
  }
);

router.get('/', authMiddleware, (req, res) => orderController.getOrders(req, res));
router.delete('/:id', authMiddleware, (req, res) => orderController.deleteOrder(req, res));
router.put('/:id/status', authMiddleware, (req, res) => orderController.updateOrderStatus(req, res));

module.exports = router;
