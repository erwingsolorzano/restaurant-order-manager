const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const OrderItem = require('./OrderItem');
const MenuItem = require('./MenuItem');

const Order = sequelize.define('Order', {
  menuItemId: {
    type: DataTypes.INTEGER,
    references: {
      model: MenuItem,
      key: 'id',
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'created',
  },
});

Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId' });

module.exports = Order;
