const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const MenuItem = require('./MenuItem'); // Importamos el MenuItem para la relación

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MenuItem,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

module.exports = OrderItem;
