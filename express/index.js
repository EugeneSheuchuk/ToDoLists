const express = require('express');
const path =require('path');
const main = require('./route/main');
const tasks = require('./route/tasks');
const mongodb = require('./db');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use('/', express.static(path.resolve(__dirname, './../build')));
app.use('/Main', main);
app.use('/tasks', tasks);
// app.get('*', (req,res) =>{
//     res.sendFile(path.resolve(__dirname,'./../build/index.html'));
// });

mongodb.connectDB();

app.listen(port, () => console.log(`Server listening port - ${port}`));


