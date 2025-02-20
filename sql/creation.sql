CREATE DATABASE restaurant_manager;
USE restaurant_manager;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Example roles...
INSERT INTO roles (name) VALUES ('admin'),('user');

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Example categories...
insert into categories (name) values ('Entrada'),('Plato Fuerte'),('Bebida'),('Postre');

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roleId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles(id)
);
-- Example users...
insert into users (name, email, password, roleId, createdAt, updatedAt) values
('root user', 'root@root.com', '$2b$10$oXXUT9wSW8biaidvvT0Iu.175CGUdPz.iTzB27DL6li1JhPqHjP3S', 1, NOW(), NOW());

CREATE TABLE menuitems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    available BOOLEAN DEFAULT TRUE,
    categoryId INT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    status ENUM('created', 'preparing', 'delivered', 'cancelled') DEFAULT 'created',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (menuItemId) REFERENCES menuitems(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE orderitems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    menuItemId INT,
    quantity INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menuItemId) REFERENCES menuitems(id)
);
