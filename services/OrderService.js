const { Order, MenuItem } = require('../models');
const NotificationService = require("./NotificationService");

const VALID_STATUSES = ['created', 'preparing', 'delivered', 'cancelled'];

class OrderService {
    constructor(notification) {
        this.orders = [];
        this.notificationService = new NotificationService(notification);
    }

    async createOrder(orderData) {
        const order = await Order.create(orderData);
        return order;
    }

    async getOrders() {
        return await Order.findAll({
            include: { model: MenuItem }
        });
    }

    async deleteOrder(id) {
        const order = await Order.findByPk(id);
        if (!order) return false;
    
        await order.destroy();
        return true;
    }

    async updateOrderStatus(id, status) {
        if (!VALID_STATUSES.includes(status)) {
          throw new Error(`Invalid order state: ${status}`);
        }
      
        const order = await Order.findByPk(id);
        if (!order) {
          return null;
        }
      
        order.status = status;
        await order.save();
      
        return order;
      }
      
      
}

module.exports = OrderService;