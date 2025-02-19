const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const MenuItem = require('./MenuItem');

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    references: {
      model: MenuItem,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

module.exports = OrderItem;
