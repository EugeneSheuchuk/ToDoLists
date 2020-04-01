const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { fromString } = require('uuidv4');
const main = require('./route/main');
const tasks = require('./route/tasks');
const mongodb = require('./db');
const serverFunction = require('./serverFunctions');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', express.static(path.resolve(__dirname, './../build')));

app.get('/auth/isAuth', (req, res) => {
    console.log('/auth isAyth', serverFunction.isUserAuth(req.cookies));
    if (serverFunction.isUserAuth(req.cookies)) {
        res.send({isAuth: true});
    } else {
        res.send({isAuth: false});
    }
});
app.post('/auth/registartion', async (req, res) => {
    try{
        const user = {...req.body};
        console.log('user', user);
        const error = serverFunction.checkRequestFields(user);
        if (error.isError) {
            delete error.isError;
            res.status(406).send(error);
            return;
        }
        user.email = user.email.toLocaleLowerCase();
        const checkEmail = await mongodb.getUserId(user.email);
        if (checkEmail) {
            res.status(406).send({errorEmail: 'this email has been used'});
        }
        const userOnDB = await mongodb.addUser(user);
        const hashEmail = fromString(userOnDB.email);
        serverFunction.setUserSession(hashEmail, userOnDB._id);
        res.cookie('todoList', hashEmail, {path: '/', expires: new Date(Date.now() + 900000)}).send({isAuth: true});
    } catch (e) {
        console.log('error in router auth post /', e);
    }
});





app.use('/Main', main);
app.use('/tasks', tasks);
app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'./../build/index.html'));
});

mongodb.connectDB()
    .then(res => {
        if (res.connection.readyState !== 0) {
            app.listen(port, () => console.log(`Server listening port - ${port}`));
            return;
        }
        console.log('Fail to connect to database');
    })
    .catch(err => {
        console.log('err ', err);
        console.log('mongoDB was not connect ', err);
    });




