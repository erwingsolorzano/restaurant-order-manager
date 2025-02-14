const NotificationService = require("./NotificationService");

class OrderService {
    constructor(notification) {
        this.orders = [];
        this.notificationService = new NotificationService(notification);
    }

    createOrder(order) {
        const id = this.orders.length + 1;
        this.orders.push({...order, id});
        this.notificationService.sendNotification("New order created");
        return order;
    }

    getOrders() {
        return this.orders;
    }

    deleteOrder(id) {
        const index = this.orders.findIndex(order => order.id === id);
        if (index !== -1) {
          this.orders.splice(index, 1);
          return true;
        }
        return false;
      }
      
}

module.exports = OrderService;