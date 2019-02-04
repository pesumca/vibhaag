const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./config/db');

const bodyParser = require('body-parser');
const { routes } = require('./config/routes');

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});