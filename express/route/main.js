const express = require('express');
const router = express.Router();
const serverFunction = require('./../serverFunctions');
const mongoose = require('mongoose');
const List = require('./../list');
const mongodb = require('./../db');

const data = serverFunction.appUsers;
const idGenerator = serverFunction.generateId();


router.use((req, res, next) => {
    console.log('Main route: ', Date.now());
    next();
});

router.get('/:id', async (req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            serverFunction.createUser(req.params.id);
            const result = await mongodb.getData();
            res.send(result);
            return;
        }
        const result = await mongodb.getData();
        res.send(result);
    } catch (e) {
        console.log('error in router main get /', e);
    }
});

router.post('/:id', async (req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            res.send("List was't create");
            return;
        }
        if (req.body.listName.trim() === '') {
            res.status(406).send("Can't create list without name");
            return;
        }
        const result = await mongodb.addList(req.body.listName);
        res.send(result);
    } catch (e) {
        console.log('error in router main post /', e);
    }
});
router.put('/:id', (req, res) => {
    if (data[req.params.id]) {
        const list = serverFunction.updateListName(data[req.params.id].lists,
            req.body.listId, req.body.newListName);
        data[req.params.id].lists = [...list];
        res.send(data[req.params.id]);
    } else {
        res.send("List's name was't change");
    }
});

router.delete('/:id', (req, res) => {
    if (data[req.params.id]) {
        const filterList = serverFunction.deleteList(data[req.params.id].lists, req.body.listId);
        data[req.params.id].lists = [...filterList];
        res.send(data[req.params.id]);
    } else {
        res.send("List was't delete");
    }
});

module.exports = router;