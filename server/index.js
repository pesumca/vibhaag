const express = require('express');
const app = express();
const { keys } = require('./config/keys');
const { routes } = require('./config/routes');
const mongoose = require('./config/db');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const passport = require('passport');
// console.log(keys)
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
require('./passport')(passport);

app.use(cors());

app.use('/', routes);
app.use(express.static(path.join(__dirname, '../client/dist/')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${port}`);
});