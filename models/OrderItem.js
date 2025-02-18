const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = OrderItem;
