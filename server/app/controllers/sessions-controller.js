const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Session } = require('../models/session');


// get all the sessions
router.get('/', (req, res) => {
    Session.find().populate('batch').populate('user').populate('subject').then(sessions => {
        res.send(sessions);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific Sessions
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Session.findById(id).populate('batch').populate('user').populate('subject').then(session => {
        res.send(session)
    })
});

// delete a session
router.delete('/:id', (req, res) => {
    let id = req.params.id
    Session.findByIdAndRemove(id).then(session => {
        if (session) {
            res.send({
                session,
                notice: 'successfully deleted session'
            });
        }
        else {
            res.send(404).send({
                notice: 'the session already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a session
router.post('/', (req, res) => {
    console.log(req.params);
    let body = req.body;
    console.log(body);
    let session = new Session(body);
    session.save().then((session) => {
        res.send(session);
    })
        .catch(err => {
            res.send(err);
        })
});

// update a specific session
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Session.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(session => {
            res.send(session)
        }).catch(err => {
            res.send(err);
        })
})


module.exports = {
    sessionsController: router
}