const express = require('express');
const router = express.Router();
var verifyToken = require('../../auth/verify-token');

const _ = require('lodash');
const { User } = require('../models/user');
var { authenticate } = require('../../auth/authenticate')

// get all the users
router.get('/', (req, res) => {
    User.find().then(users => {
        res.send(users);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific user
router.get('/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id).then(user => {
        res.send(user)
    })
});

// delete a user
router.delete('/:id', (req, res) => {
    let id = req.params.id
    User.findByIdAndRemove(id).then(user => {
        if (user) {
            res.send({
                user,
                notice: 'successfully deleted user'
            });
        }
        else {
            res.send(404).send({
                notice: 'the user already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a user
router.post('/', (req, res) => {
    let body = _.pick(req.body, ['name', 'email', 'password','roles']);
    let user = new User(body);

    user.save().then((user) => {
        // res.send(user);
        console.log('before auth')
        return user.generateAuthToken();
    }).then((token) => {
        console.log(token)
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
});

// user login
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    
    // console.log(body)
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((e) => {
        res.status(400).send()
    })
    // res.send('hello')
})

// update a specific user
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'roles', 'email']);
    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(user => {
            res.send(user)
        }).catch(err => {
            res.send(err);
        })
})

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;

module.exports = {
    usersController: router
}

// nodemon index.js development

// Mongo Server Command
// mongod --dbpath d:\code\mongo-data