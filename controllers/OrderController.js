const OrderService = require('../services/OrderService');
const EmailNotification = require('../services/EmailNotification'); // Implementación concreta

class OrderController {
    constructor() {
        this.orderService = new OrderService(new EmailNotification());
    }

    async createOrder(req, res) {
        try {
            // TODO: CHECK FOR ERRORS WITH NEW ORDER STRUCTURE...
            const { items } = req.body; // [{ menuItemId, quantity }]
            console.log('🚬 ===> createOrder ===> items:', items);
            const userId = req.user.userId;
            const order = await this.orderService.createOrder(userId, items);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await this.orderService.getOrders();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error });
        }
    }

    async deleteOrder(req, res) {
        try {
            const success = await this.orderService.deleteOrder(req.params.id);
            if (success) {
                res.json({ message: 'Order deleted successfully' });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order', error });
        }
    }

    async updateOrderStatus(req, res) {
        const { status } = req.body;
        const { id } = req.params;
      
        try {
          const updatedOrder = await this.orderService.updateOrderStatus(id, status);
          if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
          }
      
          res.json(updatedOrder);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }      
      
}

module.exports = OrderController;
