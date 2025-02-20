# Project Explanation

This document provides a detailed explanation of the project structure, the purpose of each file, and the design patterns used. This will help you understand how the project is organized and the architectural decisions behind it.

---

## **Project Structure**
The project follows a modular and organized structure to demonstrate the **SOLID principles** and the use of design patterns such as **MVC (Model-View-Controller)** and **Dependency Injection**.

### **Structure:**
```plaintext
src/
├── models/
│   ├── Order.js          # Defines the structure of orders
│   ├── MenuItem.js       # Defines the structure of menu items
├── services/
│   ├── OrderService.js   # Contains business logic for managing orders
│   ├── NotificationService.js # Handles notifications through dependencies
│   ├── EmailNotification.js  # Specific implementation for sending email notifications
│   ├── SMSNotification.js    # Specific implementation for sending SMS notifications
├── interfaces/
│   ├── INotification.js  # Defines an interface for notifications
├── controllers/
│   ├── OrderController.js # Controller handling requests related to orders
├── routes/
│   ├── orderRoutes.js    # Defines the API routes for managing orders
├── middlewares/
│   ├── errorHandler.js   # Global middleware for error handling
├── app.js                # Configures the Express application
├── server.js             # Server entry point
```

---

## **Purpose of Each File**

### **1. `models/`**
This folder contains domain model definitions.

- **`Order.js`:**
  Defines the structure of an order, including `id`, `menuItem`, `quantity`, and `status`. This model represents orders in the system.

  ```javascript
  class Order {
      constructor(id, menuItem, quantity, status = 'created') {
          this.id = id;
          this.menuItem = menuItem;
          this.quantity = quantity;
          this.status = status;
      }
  }
  module.exports = Order;
  ```

- **`MenuItem.js`:**
  Defines the structure of menu items, such as `name` and `price`. It can be extended to include categories or options.

---

### **2. `services/`**
Contains the business logic, adhering to the **Single Responsibility Principle**.

- **`OrderService.js`:**
  Manages operations on orders, such as creating, listing, and deleting orders. It interacts with data and dependencies like `NotificationService`.

- **`NotificationService.js`:**
  Acts as a bridge for notifications. Uses **Dependency Injection** to receive a concrete implementation (e.g., `EmailNotification` or `SMSNotification`).

- **`EmailNotification.js` and `SMSNotification.js`:**
  Implement the `INotification` interface. This follows the **Open/Closed Principle**, allowing new notification methods to be added without modifying existing code.

---

### **3. `interfaces/`**
Defines contracts for the classes, ensuring implementations adhere to a standard.

- **`INotification.js`:**
  An interface declaring the `send(message)` method. Classes like `EmailNotification` and `SMSNotification` must implement it.

---

### **4. `controllers/`**
Controllers handle HTTP requests and delegate logic to services.

- **`OrderController.js`:**
  Processes requests related to orders (`POST /orders`, `GET /orders`, `DELETE /orders/:id`). It follows the **Dependency Inversion Principle**, depending on abstractions rather than concrete implementations.

---

### **5. `routes/`**
Defines the API routes and connects them to controllers.

- **`orderRoutes.js`:**
  Maps HTTP routes (`/orders`) to the corresponding controller functions. It follows Express's **Middleware Chain** pattern.

---

### **6. `middlewares/`**
Contains reusable middlewares for request and response handling.

- **`errorHandler.js`:**
  A global middleware for error handling. Ensures that any unhandled errors return a consistent response to the client.

---

### **7. Root Files**
- **`app.js`:**
  Configures the Express application, loading middlewares and routes.

- **`server.js`:**
  The server entry point. Initializes the application and listens on a port.

---

## **Design Pattern: MVC + Dependency Injection**

### **1. MVC (Model-View-Controller)**
This pattern organizes the project into three main responsibilities:
- **Models (Model):**
  Represent the structure of the data (e.g., `Order.js` and `MenuItem.js`).
- **Controllers (Controller):**
  Handle HTTP requests and delegate logic to the appropriate service.
- **Services (View/Business Logic):**
  Process business logic and perform operations on the data.

**Advantage:** Keeps the code organized, clean, and maintainable.

---

### **2. Dependency Injection**
Instead of services or controllers creating their own dependencies, these are passed as arguments to their constructors. For example:
```javascript
class OrderService {
    constructor(notification) {
        this.notificationService = notification;
    }
}
```
This follows the **Dependency Inversion Principle (DIP):**
- `OrderService` depends on an abstraction (`INotification`), not on a concrete implementation (`EmailNotification`).

---

## **How SOLID Principles Influence the Design**
1. **Single Responsibility Principle:** Each file has a specific responsibility (model, service, controller, etc.).
2. **Open/Closed Principle:** New notification types can be added without modifying existing code.
3. **Liskov Substitution Principle:** Implementations like `EmailNotification` can replace `INotification` without issues.
4. **Interface Segregation Principle:** `INotification` contains small, specific methods.
5. **Dependency Inversion Principle:** Services and controllers depend on abstractions, not concrete implementations.

---
