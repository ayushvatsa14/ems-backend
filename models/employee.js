const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "employee"
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    }],
    taskCounts: {
        active: {
            type: Number,
            default: 0
        },
        newTask: {
            type: Number,
            default: 0
        },
        completed: {
            type: Number,
            default: 0
        },
        failed: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model("employee", employeeSchema);