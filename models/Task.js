const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
