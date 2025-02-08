const INotification = require("../interfaces/INotification");

class SMSNotification extends INotification{
    send(message) {
        console.log(`SMS sent: ${message}`);
    }
}

module.exports = SMSNotification;