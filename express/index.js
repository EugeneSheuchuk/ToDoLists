const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/list/:id', (req, res) => {
    if (appUsers[req.params.id]) {
        res.send(appUsers[req.params.id]);
    } else {
        createUser(req.params.id);
        res.send(appUsers[req.params.id]);
    }
});

app.post('/addList/:id', (req, res) => {
    if (appUsers[req.params.id]) {
        const list = createList(req.body.listName);
        appUsers[req.params.id].lists.push(list);
        res.send(appUsers[req.params.id]);
    } else {
        res.send("List was't create");
    }
});

app.delete('/deleteList/:id', (req, res) => {
    if (appUsers[req.params.id]) {
        const filterList = deleteList(appUsers[req.params.id].lists, req.body.listId);
        appUsers[req.params.id].lists = [...filterList];
        res.send(appUsers[req.params.id]);
    } else {
        res.send("List was't delete");
    }
});

app.listen(port, () => console.log(`Server listening port - ${port}`));

let listId = 0;


const appUsers = {};

function createUser(userId) {
    appUsers[userId] = {
        lists: [],
    };
}
function createList(listName) {
    const list = {
        listId: listId,
        listName: listName,
    };
    listId += 1;
    return list;
}

function deleteList(lists, listId) {
    const copy = [...lists];
    return copy.filter(item => item.listId !== listId);
}


