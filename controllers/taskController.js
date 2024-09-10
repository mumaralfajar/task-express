const tasks = require('../models/taskModel');
const moment = require('moment');

// Get all tasks (with pagination)
exports.getAllTasks = (req, res) => {
    const { page = 1, size = 5 } = req.query;
    const offset = (page - 1) * size;
    const paginatedItems = tasks.slice(offset, offset + parseInt(size));

    return res.json({
        status: true,
        message: 'Tasks retrieved successfully',
        time: moment().valueOf(),
        data: {
            page: parseInt(page),
            size: parseInt(size),
            totalItems: tasks.length,
            totalPages: Math.ceil(tasks.length / size),
            items: paginatedItems
        }
    });
};

// Get task by ID
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({
            status: false,
            message: 'Task not found',
            time: moment().valueOf(),
            data: null
        });
    }
    return res.json({
        status: true,
        message: 'Task retrieved successfully',
        time: moment().valueOf(),
        data: task
    });
};

// Create new task
exports.createTask = (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description
    };
    tasks.push(newTask);
    return res.json({
        status: true,
        message: 'Task created successfully',
        time: moment().valueOf(),
        data: newTask
    });
};

// Update task by ID
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({
            status: false,
            message: 'Task not found',
            time: moment().valueOf(),
            data: null
        });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    return res.json({
        status: true,
        message: 'Task updated successfully',
        time: moment().valueOf(),
        data: task
    });
};

// Delete task by ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({
            status: false,
            message: 'Task not found',
            time: moment().valueOf(),
            data: null
        });
    }
    tasks.splice(taskIndex, 1);

    return res.json({
        status: true,
        message: 'Task deleted successfully',
        time: moment().valueOf(),
        data: null
    });
};
