const express = require('express');
const main = require('./route/main');
const tasks = require('./route/tasks');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/main', main);
app.use('/tasks', tasks);

app.listen(port, () => console.log(`Server listening port - ${port}`));


