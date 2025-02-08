const OrderService = require('../services/OrderService');
const EmailNotification = require('../services/EmailNotification'); // Implementación concreta

class OrderController {
    constructor() {
        // Inicialización de OrderService con una dependencia
        this.orderService = new OrderService(new EmailNotification());
    }

    createOrder(req, res) {
        const order = this.orderService.createOrder(req.body);
        res.status(201).json(order);
    }

    getOrders(req, res) {
        const orders = this.orderService.getOrders();
        res.json(orders);
    }
}

module.exports = OrderController;
