const express = require('express');
const router = express.Router();
const serverFunction = require('./../serverFunctions');
const mongodb = require('./../db');

const data = serverFunction.appUsers;


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
            res.send("List was't add");
            return;
        }
        if (req.body.listName.trim() === '') {
            res.status(406).send("Can't create list without name");
            return;
        }
        const result = await mongodb.addList(req.body.listName);
        if (result) {
            const lists = await mongodb.getData();
            res.send(lists);
        } else {
            res.status(406).send("List was't add");
        }
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

router.delete('/:id', async (req, res) => {
    try {
        if (serverFunction.checkReqId(req)) {
            res.send("List was't delete");
            return;
        }
        const result = await mongodb.deleteList(req.body.listId);
        if (result) {
            const lists = await mongodb.getData();
            res.send(lists);
        } else {
            res.status(406).send("List was't delete");
        }
    } catch (e) {
        console.log('error in router main delete /', e);
    }
});

module.exports = router;