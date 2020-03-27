const mongoose = require('mongoose');
const Task = require('./task');

const listSchema = new mongoose.Schema({
    listName: String,
});

const List = mongoose.model('lists', listSchema);

module.exports = List;