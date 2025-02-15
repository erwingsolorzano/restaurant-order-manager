const Order = require("../models/Order");
const NotificationService = require("./NotificationService");

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
        return await Order.findAll();
    }

    async deleteOrder(id) {
        const order = await Order.findByPk(id);
        if (!order) return false;
    
        await order.destroy();
        return true;
    }
      
}

module.exports = OrderService;