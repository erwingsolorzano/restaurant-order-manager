# Restaurant Order Manager

A Node.js project designed to demonstrate the implementation of **SOLID principles** in software development. This project manages restaurant orders and menus while adhering to best practices in clean code and software architecture.

## Features
- **Order Management**: Create, list, and update orders.
- **Menu Management**: Manage menu items.
- **Notifications**: Notify users when orders are created (e.g., via email or SMS).
- **Extensible Architecture**: Easily add new features while maintaining clean code.

## Prerequisites
- [Node.js](https://nodejs.org/) installed (v14 or higher).
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for dependency management.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd restaurant-order-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on [http://localhost:3000](http://localhost:3000).

## Project Structure
```plaintext
src/
├── models/
│   ├── Order.js          # Model for orders
│   ├── MenuItem.js       # Model for menu items
├── services/
│   ├── OrderService.js   # Business logic for orders
│   ├── NotificationService.js # Notification service
│   ├── EmailNotification.js  # Email notification implementation
│   ├── SMSNotification.js    # SMS notification implementation
├── interfaces/
│   ├── INotification.js  # Notification interface
├── controllers/
│   ├── OrderController.js # Handles API requests for orders
├── routes/
│   ├── orderRoutes.js    # Routes for order management
├── middlewares/
│   ├── errorHandler.js   # Middleware for handling errors
├── app.js                # Express app configuration
├── server.js             # Server entry point
```

## Principles Demonstrated

### 1. **Single Responsibility Principle (SRP)**
Each class or module has a single, well-defined responsibility:
- `OrderService.js`: Handles all order-related business logic.
- `NotificationService.js`: Manages notifications.

### 2. **Open/Closed Principle (OCP)**
The system is open for extension but closed for modification:
- You can add new notification methods (e.g., Push Notifications) by implementing `INotification` without modifying existing code.

### 3. **Liskov Substitution Principle (LSP)**
Derived classes can replace their base classes without breaking the application:
- `EmailNotification` and `SMSNotification` are interchangeable implementations of `INotification`.

### 4. **Interface Segregation Principle (ISP)**
Large interfaces are divided into smaller, specific ones:
- `INotification` defines only the methods required for notifications.

### 5. **Dependency Inversion Principle (DIP)**
High-level modules depend on abstractions, not concrete implementations:
- `OrderService` depends on `INotification`, making it easy to switch between notification methods.

## API Endpoints

### Orders
| Method | Endpoint      | Description            |
|--------|---------------|------------------------|
| GET    | `/orders`     | List all orders        |
| POST   | `/orders`     | Create a new order     |
| DELETE | `/orders/:id` | Delete an order by ID  |

### Example Request
#### Create an Order
```bash
POST /orders
Content-Type: application/json

{
  "menuItem": "Burger",
  "quantity": 2
}
```

### Example Response
```json
{
  "id": 1,
  "menuItem": "Burger",
  "quantity": 2,
  "status": "created"
}
```

#### Get All Orders
```bash
GET /orders
```

### Example Response
```json
[
  {
    "id": 1,
    "menuItem": "Burger",
    "quantity": 2,
    "status": "created"
  },
  {
    "id": 2,
    "menuItem": "Pizza",
    "quantity": 1,
    "status": "created"
  }
]
```

## Notifications
The system currently supports email notifications. When a new order is created, you will see a log in the console:
```plaintext
Email sent: New order created
```

## Additional Documentation
- [Project Explanation (Spanish)](explication-spanish.md)
- [Project Explanation (English)](explication-english.md)

## Contribution
Feel free to fork this repository and submit pull requests to enhance the project.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
**Created by [Erwing Solorzano]** - Showcasing the SOLID principles with Node.js and JavaScript.
