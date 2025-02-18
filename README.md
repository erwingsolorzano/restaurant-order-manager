# Restaurant Order Manager

This is a Full Stack project that simulates order and menu management in a restaurant. It uses Node.js, Express, Sequelize, and MySQL for the backend and React with Material UI for the frontend.

## Technologies Used

### Backend:
- Node.js
- Express
- Sequelize
- MySQL
- JWT (Authentication)
- CORS

### Frontend:
- React
- Axios
- Material UI (MUI)

## Project Structure

```
restaurant-order-manager/
│
├── backend/
│   ├── models/           # Sequelize models
│   ├── routes/           # Express routes
│   ├── controllers/      # Controllers
│   ├── services/         # Business logic
│   ├── middlewares/      # Middlewares (JWT, CORS)
│   ├── config/           # Database configuration
│   ├── .env              # Environment variables (MySQL and JWT credentials)
│   ├── server.js         # Backend entry point
│   └── package.json      # Backend dependencies
│
├── restaurant-order-frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Application pages
│   │   ├── api/          # Axios configuration
│   │   ├── App.js        # Main component
│   │   ├── index.js      # React entry point
│   ├── public/           # Static files
│   ├── .env              # Frontend environment variables
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
```

## Implemented Features

### Backend:
- CRUD for Menu (`/menu`): Create, read, update, and delete menu items.
- CRUD for Orders (`/orders`): Create, read, and delete orders.
- Order Status Management: `created`, `preparing`, `delivered`, `cancelled`.
- `Order -> MenuItem` relationship using Sequelize.
- User registration and login (`/users`).
- JWT authentication and protected routes.

### Frontend:
- Display menu with Material UI.
- Axios configured to consume API.
- Page navigation (`MenuPage`, `OrdersPage`, `LoginPage`, `RegisterPage`).

## Installation

### Backend:
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root directory with the following credentials:
   ```ini
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=restaurant_manager
   JWT_KEY=super_secret_key
   ```
4. Sync the database:
   ```bash
   node sync-db.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend:
1. Navigate to the `restaurant-order-frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend root directory with the API URL:
   ```ini
   REACT_APP_API_URL=http://localhost:3000
   ```
4. Start React:
   ```bash
   npm start
   ```

## Backend Endpoints

### Menu
- `GET /menu`
- `POST /menu`
- `PUT /menu/:id`
- `DELETE /menu/:id`

### Orders
- `GET /orders`
- `POST /orders` (Requires JWT)
- `DELETE /orders/:id` (Requires JWT)
- `PUT /orders/:id/status` (Requires JWT)

### Users
- `POST /users/register`
- `POST /users/login`

## Documentation
- [Explanation in Spanish](./explication-spanish.md)
- [Explanation in English](./explication-english.md)

## Authors
- Erwing Solorzano
