const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MenuItem = sequelize.define('MenuItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
});


module.exports = MenuItem;
