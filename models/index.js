const Order = require('./Order');
const MenuItem = require('./MenuItem');

// Definir relaciones
MenuItem.hasMany(Order, { foreignKey: 'menuItemId' });
Order.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

module.exports = { Order, MenuItem };