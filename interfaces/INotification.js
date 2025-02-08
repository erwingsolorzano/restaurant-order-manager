class INotification {
    send(message) {
        throw new Error("Method 'send()' must be implemented.");
    }
}

module.exports = INotification;