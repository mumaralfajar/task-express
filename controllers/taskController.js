const Task = require('../models/taskModel');
const moment = require('moment');
const mongoose = require('mongoose');

// Get all tasks (with pagination)
exports.getAllTasks = async (req, res) => {
    try {
        const { page = 1, size = 5 } = req.query;
        const limit = parseInt(size);
        const skip = (page - 1) * limit;

        const tasks = await Task.find().limit(limit).skip(skip);
        const totalItems = await Task.countDocuments();

        res.json({
            status: true,
            message: 'Tasks retrieved successfully',
            time: moment().valueOf(),
            data: {
                page: parseInt(page),
                size: limit,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                items: tasks
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID',
                time: moment().valueOf(),
                data: null
            });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                status: false,
                message: 'Task not found',
                time: moment().valueOf(),
                data: null
            });
        }
        res.json({
            status: true,
            message: 'Task retrieved successfully',
            time: moment().valueOf(),
            data: task
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task', error });
    }
};

// Create new task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                status: false,
                message: 'Title and description are required',
                time: moment().valueOf(),
                data: null
            });
        }

        const newTask = new Task({
            title,
            description
        });
        await newTask.save();
        res.json({
            status: true,
            message: 'Task created successfully',
            time: moment().valueOf(),
            data: newTask
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Update task by ID
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID',
                time: moment().valueOf(),
                data: null
            });
        }

        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                status: false,
                message: 'Title and description are required',
                time: moment().valueOf(),
                data: null
            });
        }

        const task = await Task.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });

        if (!task) {
            return res.status(404).json({
                status: false,
                message: 'Task not found',
                time: moment().valueOf(),
                data: null
            });
        }

        res.json({
            status: true,
            message: 'Task updated successfully',
            time: moment().valueOf(),
            data: task
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete task by ID
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID',
                time: moment().valueOf(),
                data: null
            });
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                status: false,
                message: 'Task not found',
                time: moment().valueOf(),
                data: null
            });
        }

        res.json({
            status: true,
            message: 'Task deleted successfully',
            time: moment().valueOf(),
            data: null
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
