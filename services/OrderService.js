const NotificationService = require("./NotificationService");

class OrderService {
    constructor(notification) {
        this.orders = [];
        this.notificationService = new NotificationService(notification);
    }

    createOrder(order) {
        this.orders.push(order);
        this.notificationService.sendNotification("New order created");
        return order;
    }

    getOrders() {
        return this.orders;
    }
}

module.exports = OrderService;