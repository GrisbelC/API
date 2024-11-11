const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync().then(() => console.log('Base de datos conectada'));

app.listen(4000, () => console.log('Servidor corriendo en el puerto 3000'));
