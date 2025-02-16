const { DataTypes } = require('sequelize');
const sequelize = require('../db');
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

module.exports = Order;
