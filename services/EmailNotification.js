const INotification = require("../interfaces/INotification");

class EmailNotification extends INotification {
    send(message) {
        console.log(`Email sent: ${message}`);
    }
}

module.exports = EmailNotification;