const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false,
    },
    newTask: {
        type: Boolean,
        default: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    failed: {
        type: Boolean,
        default: false,
    },
    taskTitle: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    taskDate: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
    },
});

module.exports=mongoose.model('task', taskSchema);
