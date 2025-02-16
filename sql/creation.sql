CREATE DATABASE restaurant_manager;
USE restaurant_manager;

CREATE TABLE menuitems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    available BOOLEAN DEFAULT TRUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menuItemId INT NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR(50) DEFAULT 'created',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT fk_menuitem FOREIGN KEY (menuItemId) REFERENCES menuitems(id)
);
