const express = require('express');
const router = express.Router();
const serverFunction = require('./../serverFunctions');

const data = serverFunction.appUsers;
const idGenerator = serverFunction.generateId();


router.use((req, res, next) => {
    console.log('Task route: ', Date.now());
    next();
});


router.get('/', (req, res) => {
    if (data[req.query.id]) {
        const getListTasks = serverFunction.getListTasks(data[req.query.id].lists, req.query.listId);
        res.send(getListTasks);
    } else {
        res.send("Can't get list tasks");
    }
});
router.post('/:id', (req, res) => {
    if (data[req.params.id]) {
        const task = {taskId: idGenerator('task'), ...req.body.task};
        const lists = serverFunction.addTask(data[req.params.id].lists, req.body.listId, task);
        data[req.params.id].lists = [...lists];
        const getListTasks = serverFunction.getListTasks(data[req.params.id].lists, req.body.listId);
        res.send(getListTasks);
    } else {
        res.send("The task was't add");
    }
});
router.put('/:id', (req, res) => {
    console.log('tasks', req.body);
    if (data[req.params.id]) {
        const lists = serverFunction.changeTaskStatus(data[req.params.id].lists, req.body.listId, req.body.taskId);
        data[req.params.id].lists = [...lists];
        const getListTasks = serverFunction.getListTasks(data[req.params.id].lists, req.body.listId);
        res.send(getListTasks);
    } else {
        res.send("The status of the task was't change");
    }
});
router.put('/editTask/:id', (req, res) => {
    if (data[req.params.id]) {
        const lists = serverFunction.updateTaskText(data[req.params.id].lists, req.body.listId, req.body.taskId, req.body.newTaskText);
        data[req.params.id].lists = [...lists];
        const getListTasks = serverFunction.getListTasks(data[req.params.id].lists, req.body.listId);
        res.send(getListTasks);
    } else {
        res.send("The text of the task was't change");
    }
});
router.delete('/:id', (req, res) => {
    if (data[req.params.id]) {
        const lists = serverFunction.deleteTask(data[req.params.id].lists, req.body.listId, req.body.taskId);
        data[req.params.id].lists = [...lists];
        const getListTasks = serverFunction.getListTasks(data[req.params.id].lists, req.body.listId);
        res.send(getListTasks);
    } else {
        res.send("The task was't delete");
    }
});

module.exports = router;