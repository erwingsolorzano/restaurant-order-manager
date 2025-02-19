const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const OrderItem = require('./OrderItem');
const User = require('./User');

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'created',
  },
}, {
  timestamps: true,
});

Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Order;
