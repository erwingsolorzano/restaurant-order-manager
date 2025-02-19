const sequelize = require('./db');
require('./models/Order');
require('./models/OrderItem');
require('./models/MenuItem');
require('./models/User');

sequelize.sync({ force: true }).then(() => {
  console.log('Base de datos sincronizada');
  process.exit();
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
