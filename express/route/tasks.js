const express = require('express');
const router = express.Router();
const serverFunction = require('./../serverFunctions');
const mongodb = require('./../db');

const data = serverFunction.appUsers;


router.use((req, res, next) => {
    console.log('Task route: ', Date.now());
    next();
});


router.get('/', async (req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            res.send("Cannot get tasks");
            return;
        }
        const tasks = await mongodb.getListTasks(req.query.listId);
        res.send(tasks);
    } catch (e) {
        res.send("Cannot get tasks");
    }
});
router.post('/:id', async(req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            console.log('error');
            res.send("The task was't add");
            return;
        }
        if (req.body.task.taskText.trim() === '') {
            res.status(406).send("Can't add task without text");
            return;
        }
        const result = await mongodb.addTask(req.body.task);
        if (result) {
            const tasks = await mongodb.getListTasks(req.body.task.listId);
            res.send(tasks);
        } else {
            console.log('router task post /', result);
        }
    } catch (e) {
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