const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskText: String,
    taskStatus: String,
    isEdit: Boolean
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;