const { Order, OrderItem, MenuItem } = require('../models');
const NotificationService = require("./NotificationService");

const VALID_STATUSES = ['created', 'preparing', 'delivered', 'cancelled'];

class OrderService {
    constructor(notification) {
        this.orders = [];
        this.notificationService = new NotificationService(notification);
    }

    async createOrder(userId, items) {
        const order = await Order.create({ status: 'created', userId });
    
        console.log('🚬 ===> createOrder ===> order:', order);
        const orderItems = items.map(item => ({
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        }));
        console.log('🚬 ===> createOrder ===> orderItems:', orderItems);
    
        await OrderItem.bulkCreate(orderItems);
    
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