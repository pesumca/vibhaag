const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const _ = require('lodash');

const port = 3000;

// middleware

app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url} : ${req.ip} : ${new Date()}`);
    next();
})

// route handler methods

app.get('/',(req,res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(port,function(){
    console.log(`listening on port ${port}`);
});