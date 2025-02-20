const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require('../models/MenuItem');
const NotificationService = require("./NotificationService");

const VALID_STATUSES = ['created', 'preparing', 'delivered', 'cancelled'];
const activeOrders = ['created', 'preparing'];
const finalizedOrders = ['delivered', 'cancelled'];
class OrderService {
    constructor(notification) {
        this.orders = [];
        this.notificationService = new NotificationService(notification);
    }

    async createOrder(userId, items) {
      try {
        const order = await Order.create({ status: 'created', userId });
    
        const orderItems = items.map(item => ({
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        }));
    
        await OrderItem.bulkCreate(orderItems);
    
        return order;
      } catch (error) {
        console.log(error);
        return error.message || error;
      }
    }

    async getOrders() {
      return await Order.findAll({
        include: [{ model: OrderItem, include: [MenuItem] }],
      });
    }

    async getActiveOrders() {
      return await Order.findAll({
        where: {
          status: activeOrders,
        },
        include: [{ model: OrderItem, include: [MenuItem] }],
      });
    }

    async getCompletedOrders(offset, limit) {
      return await Order.findAndCountAll({
        where: {
          status: ['delivered', 'cancelled'],
        },
        include: [
          {
            model: OrderItem,
            include: [MenuItem],
          },
        ],
        offset,
        limit,
        distinct: true,
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