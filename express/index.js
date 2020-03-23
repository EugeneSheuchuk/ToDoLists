const serverFuction = require('./serverFunctions');

const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const data = serverFuction.appUsers;
const idGenerator = serverFuction.generateId();

app.get('/main/:id', (req, res) => {
    if (data[req.params.id]) {
        res.send(data[req.params.id]);
    } else {
        serverFuction.createUser(req.params.id);
        res.send(data[req.params.id]);
    }
});

app.post('/main/:id', (req, res) => {
    if (data[req.params.id]) {
        const list = serverFuction.createList(idGenerator('list'), req.body.listName);
        data[req.params.id].lists.push(list);
        res.send(data[req.params.id]);
    } else {
        res.send("List was't create");
    }
});
app.put('/main/:id', (req, res) => {
    if (data[req.params.id]) {
        const list = serverFuction.updateListName(data[req.params.id].lists,
            req.body.listId, req.body.newListName);
        data[req.params.id].lists = [...list];
        res.send(data[req.params.id]);
    } else {
        res.send("List's name was't change");
    }
});

app.delete('/main/:id', (req, res) => {
    if (data[req.params.id]) {
        const filterList = serverFuction.deleteList(data[req.params.id].lists, req.body.listId);
        data[req.params.id].lists = [...filterList];
        res.send(data[req.params.id]);
    } else {
        res.send("List was't delete");
    }
});



app.get('/tasks', (req, res) => {
    if (data[req.query.id]) {
        const getListTasks = serverFuction.getListTasks(data[req.query.id].lists, req.query.listId);
        res.send(getListTasks);
    } else {
        res.send("Can't get list tasks");
    }
});
app.post('/tasks/:id', (req, res) => {
    if (data[req.params.id]) {
        const task = {taskId: idGenerator('task'), ...req.body.task};
        const lists = serverFuction.addTask(data[req.params.id].lists, req.body.listId, task);
        data[req.params.id].lists = [...lists];
        const getListTasks = serverFuction.getListTasks(data[req.params.id].lists, req.body.listId);
        res.send(getListTasks);
    } else {
        res.send("The task was't add");
    }
});
app.put('/tasks/:id', (req, res) => {
    if (data[req.params.id]) {
        const lists = serverFuction.changeTaskStatus(data[req.params.id].lists, req.body.listId, req.body.taskId);
        data[req.params.id].lists = [...lists];
        const getListTasks = serverFuction.getListTasks(data[req.params.id].lists, req.body.listId);
        res.send(getListTasks);
    }
});


app.listen(port, () => console.log(`Server listening port - ${port}`));


