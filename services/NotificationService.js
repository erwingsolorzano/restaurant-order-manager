class NotificationService {
    constructor(notification) {
        this.notification = notification; // Abstraction
    }

    sendNotification(message) {
        this.notification.send(message);
    }
}

module.exports = NotificationService;