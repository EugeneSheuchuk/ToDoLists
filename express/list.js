const mongoose = require('mongoose');
const Task = require('./task');

const listSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    listName: String,
    tasks: Array
});

const List = mongoose.model('List', listSchema);

module.exports = List;