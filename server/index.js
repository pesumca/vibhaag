const express = require('express');

const app = express();

const mongoose = require('./config/db');

const bodyParser = require('body-parser');

const userRouter = require('./routes/users');

const port = 3000;

app.use(bodyParser.json());

// middleware

app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url} : ${req.ip} : ${new Date()}`);
    next();
})

// route handler methods

app.get('/',(req,res) => {
    res.send('<h1>Hello world</h1>');
});

app.use('/users',userRouter);

app.listen(port,function(){
    console.log(`listening on port ${port}`);
});