const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use('/orders', orderRoutes);
app.use(errorHandler);

module.exports = app;