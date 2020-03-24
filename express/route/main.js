const express = require('express');
const router = express.Router();
const serverFunction = require('./../serverFunctions');
const mongoose = require('mongoose');
const List = require('./../list');

const data = serverFunction.appUsers;
const idGenerator = serverFunction.generateId();


router.use((req, res, next) => {
    console.log('Main route: ', Date.now());
    next();
});

router.get('/:id', (req, res) => {
    if (serverFunction.checkReqId(req)) {
        serverFunction.createUser(req.params.id);
        List.find()
            .then(result => res.send(result))
            .catch(err => {
                console.log('router main get / create user ', err);
                res.send(err);
            });
        return;
    }
    List.find()
        .then(result => res.send(result))
        .catch(err => {
            console.log('router main get / ', err);
            res.send(err);
        });
});

router.post('/:id', (req, res) => {
    if (data[req.params.id]) {
        const list = serverFunction.createList(idGenerator('list'), req.body.listName);
        data[req.params.id].lists.push(list);
        res.send(data[req.params.id]);
    } else {
        res.send("List was't create");
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