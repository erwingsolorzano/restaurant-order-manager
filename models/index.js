const Order = require('./Order');
const MenuItem = require('./MenuItem');
const User = require('./User');

// Relaciones
MenuItem.hasMany(Order, { foreignKey: 'menuItemId' });
Order.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

module.exports = { Order, MenuItem, User };
