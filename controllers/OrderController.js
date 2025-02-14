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

    deleteOrder(req, res) {
        const id = parseInt(req.params.id);
        const result = this.orderService.deleteOrder(id);
        if (result) {
            res.status(200).json({ message: `Order with id ${id} deleted.` });
        } else {
            res.status(404).json({ message: `Order with id ${id} not found.` });
        }
    }
      
}

module.exports = OrderController;
