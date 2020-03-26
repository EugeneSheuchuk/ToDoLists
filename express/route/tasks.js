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
            res.status(406).send("You are not authorised");
            return;
        }
        const tasks = await mongodb.getListTasks(req.query.listId);
        res.send(tasks);
    } catch (e) {
        res.status(406).send(e);
    }
});
router.post('/:id', async(req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            res.status(406).send("You are not authorised");
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
            res.status(406).send("The task was't add");
        }
    } catch (e) {
        res.status(406).send(e);
    }
});
router.put('/:id', async (req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            res.status(406).send("You are not authorised");
            return;
        }
        const result = await mongodb.changeTaskStatus(req.body.taskId, req.body.currentStatus);
        if (result) {
            const tasks = await mongodb.getListTasks(req.body.listId);
            res.send(tasks);
        } else {
            res.status(406).send("The task status was't change");
        }
    } catch (e) {
        res.status(406).send(e);
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