const mongoose = require('mongoose');
const Task = require('./models/taskModel');

const dummyTasks = [
    { title: 'Task 1', description: 'Description for task 1' },
    { title: 'Task 2', description: 'Description for task 2' },
    { title: 'Task 3', description: 'Description for task 3' },
    { title: 'Task 4', description: 'Description for task 4' },
    { title: 'Task 5', description: 'Description for task 5' },
    { title: 'Task 6', description: 'Description for task 6' },
    { title: 'Task 7', description: 'Description for task 7' },
    { title: 'Task 8', description: 'Description for task 8' },
    { title: 'Task 9', description: 'Description for task 9' },
    { title: 'Task 10', description: 'Description for task 10' },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        return Task.countDocuments();
    })
    .then(count => {
        if (count === 0) {
            return Task.insertMany(dummyTasks);
        } else {
            console.log('Tasks already exist. No dummy data inserted.');
        }
    })
    .then(() => {
        console.log('Dummy data inserted successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting dummy data:', err);
        mongoose.connection.close();
    });
