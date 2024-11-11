const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { name, dueDate } = req.body;
    try {
        const task = await Task.create({ name, dueDate, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear tarea' });
    }
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
};

exports.getTask = async (req, res) => {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (task) res.json(task);
    else res.status(404).json({ error: 'Tarea no encontrada' });
};

exports.updateTask = async (req, res) => {
    const { name, dueDate, status } = req.body;
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (task) {
        task.name = name || task.name;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        await task.save();
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
};

exports.deleteTask = async (req, res) => {
    const task = await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
    res.status(task ? 204 : 404).send();
};
