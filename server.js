const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const userRoutes = require('./routes/userRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/orders', orderRoutes);
app.use('/menu', menuRoutes);
app.use('/users', userRoutes);
app.use('/roles', rolesRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
