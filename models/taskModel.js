const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
