const express = require('express');
const main = require('./route/main');
const tasks = require('./route/tasks');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const port = 8080;

mongoose.connect('mongodb://localhost:27017/todolists',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/main', main);
app.use('/tasks', tasks);

app.listen(port, () => console.log(`Server listening port - ${port}`));


