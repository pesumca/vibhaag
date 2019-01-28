const express = require('express');
const app = express();
const mongoose = require('./config/db');
const { Users } = require('./models/users');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const departmentRouter = require('./routes/departments');
const port = 3000;

app.use(bodyParser.json());

app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url} : ${req.ip} : ${new Date()}`);
    next();
});

app.use('/users', userRouter);
app.use('/departments', departmentRouter);

app.listen(port,function(){
    console.log(`listening on port ${port}`);
});