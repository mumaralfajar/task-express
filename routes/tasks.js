const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validationMiddleware');
const tasks = require('../models/taskModel');

// POST /tasks - With validation middleware
router.post('/tasks', validateTask, (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description
    };
    tasks.push(newTask);

    res.json({
        status: true,
        message: 'Task created successfully',
        time: Date.now(),
        data: newTask
    });
});

// PUT /tasks/:id - With validation middleware
router.put('/tasks/:id', validateTask, (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        return res.status(404).json({
            status: false,
            message: 'Task not found',
            time: Date.now(),
            data: null
        });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    res.json({
        status: true,
        message: 'Task updated successfully',
        time: Date.now(),
        data: task
    });
});

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
