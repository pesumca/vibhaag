var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('../../auth/verify-token');
const _ = require('lodash');

const { User } = require('../models/user');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../../config/keys'); // get config file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', function (req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.keys.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });

});

router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.post('/register', function (req, res) {


    let body = _.pick(req.body, ['name', 'email', 'roles']);
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    body.password = hashedPassword;
    let user = new User(body);
    user.save().then((user, err) => {
        if (err)
            return res.status(500).send("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id }, config.keys.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    })
        .catch(err => {
            res.send(err);
        })

});

router.get('/me', VerifyToken, function (req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });

});

module.exports = {
    authController: router
}