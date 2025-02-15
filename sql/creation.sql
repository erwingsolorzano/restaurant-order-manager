CREATE DATABASE restaurant_manager;
USE restaurant_manager;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menuItem VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR(50) DEFAULT 'created',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
