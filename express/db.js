const mongoose = require('mongoose');
const List = require('./list');
const Task = require('./task');

const status = {
    complete: 'Complete',
    inProcess: 'In progress',
};

module.exports = {
    connectDB() {
        mongoose.connect('mongodb://localhost:27017/todolists',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('mongoDB connected'))
            .catch(err => console.log('mongoDB was not connect ', err));
    },
    getData() {
        return List.find();
    },
    async addList(listName) {
        try {
            const newList = new List({
                listName
            });
            await newList.save();
            return true;
        } catch (e) {
            return false;
        }
    },
    async deleteList(id) {
        try {
            await Task.deleteMany({listId: id});
            await List.findOneAndDelete({_id: id});
            return true;
        } catch (e) {
            return false;
        }
    },
    async changeListName(id, newName) {
        try {
            await List.updateOne({_id: id}, {listName: newName});
            return true;
        } catch (e) {
            return false;
        }
    },
    async getListTasks(listId) {
        try {
            return await Task.find({listId});
        } catch (e) {
            console.log('error in getListTasks', e);
        }

    },
    async addTask(task) {
        try {
            const newTask = new Task({
                ...task,
            });
            await newTask.save();
            return true;
        } catch (e) {
            return false;
        }
    },
    async changeTaskStatus(taskId, currentStatus) {
        try {
            const newStatus = currentStatus === status.inProcess ? status.complete : status.inProcess;
            await Task.updateOne({_id: taskId}, {taskStatus: newStatus});
            return true;
        } catch (e) {
            return false;
        }
    },
    async changeTaskText(id, newText) {
        try {
            await Task.updateOne({_id: id}, {taskText: newText});
            return true;
        } catch (e) {
            return false;
        }
    },
    async deleteTask(taskId) {
        try {
            await Task.findOneAndDelete({_id: taskId});
            return true;
        } catch (e) {
            return false;
        }
    },
};