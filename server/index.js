const express = require('express');
const app = express();
const { keys } = require('./config/keys');
const { routes } = require('./config/routes');
const mongoose = require('./config/db');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
// console.log(keys)
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);
app.use(express.static('/client/dist'));

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: "../client/dist/" });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});