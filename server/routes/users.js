const express = require('express');

const router = express.Router();

const _ = require('lodash');

const { Users } = require('../models/users');

router.get('/',(req,res) => {
    Users.find().then(users => {
        res.send(users);
    })
    .catch(err => {
        res.send(err);
    })
});

router.post('/',(req,res) => {
    let body = _.pick(req.body,[name,email,phone]);
    let user = new Users(body);
    user.save().then((user) => {
        res.send(user);
    })
    .catch(err => {
        res.send(err);
    })
});

module.exports = router;
