const sequelize = require('./db');
const Order = require('./models/Order');
const MenuItem = require('./models/MenuItem');

// Definir relaciones
MenuItem.hasMany(Order, { foreignKey: 'menuItemId' });
Order.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente con relaciones.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
