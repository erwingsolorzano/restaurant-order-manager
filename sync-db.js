const sequelize = require('./db');
const { Order, MenuItem, User } = require('./models');

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
