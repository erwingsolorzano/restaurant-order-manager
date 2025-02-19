const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const errorHandler = require('./middlewares/errorHandler');
const rolesRoutes = require('./routes/rolesRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/orders', orderRoutes);
app.use('/menu', menuRoutes);
app.use('/roles', rolesRoutes);
app.use(errorHandler);

module.exports = app;