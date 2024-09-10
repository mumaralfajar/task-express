const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validationMiddleware');

// POST /tasks - Create a new task
router.post('/tasks', validateTask, taskController.createTask);

// PUT /tasks/:id - Update a task
router.put('/tasks/:id', validateTask, taskController.updateTask);

// GET /tasks - Get all tasks with pagination
router.get('/tasks', taskController.getAllTasks);

// GET /tasks/:id - Get a task by ID
router.get('/tasks/:id', taskController.getTaskById);

// DELETE /tasks/:id - Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
