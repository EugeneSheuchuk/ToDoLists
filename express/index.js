const serverFuction = require('./serverFunctions');

const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/list/:id', (req, res) => {
    if (serverFuction.appUsers[req.params.id]) {
        res.send(serverFuction.appUsers[req.params.id]);
    } else {
        serverFuction.createUser(req.params.id);
        res.send(serverFuction.appUsers[req.params.id]);
    }
});

app.post('/addList/:id', (req, res) => {
    if (serverFuction.appUsers[req.params.id]) {
        const list = serverFuction.createList(req.body.listName);
        serverFuction.appUsers[req.params.id].lists.push(list);
        res.send(serverFuction.appUsers[req.params.id]);
    } else {
        res.send("List was't create");
    }
});
app.put('/updateListName/:id', (req, res) => {
    if (serverFuction.appUsers[req.params.id]) {
        const list = serverFuction.updateListName(serverFuction.appUsers[req.params.id].lists,
            req.body.listId, req.body.newListName);
        serverFuction.appUsers[req.params.id].lists = [...list];
        res.send(serverFuction.appUsers[req.params.id]);
    } else {
        res.send("List's name was't change");
    }
});

app.delete('/deleteList/:id', (req, res) => {
    if (serverFuction.appUsers[req.params.id]) {
        const filterList = serverFuction.deleteList(serverFuction.appUsers[req.params.id].lists, req.body.listId);
        serverFuction.appUsers[req.params.id].lists = [...filterList];
        res.send(serverFuction.appUsers[req.params.id]);
    } else {
        res.send("List was't delete");
    }
});

app.listen(port, () => console.log(`Server listening port - ${port}`));


