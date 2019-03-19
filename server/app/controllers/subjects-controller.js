const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Subject } = require('../models/subject');

// get all the subjects
router.get('/', (req, res) => {
    Subject.find().then(subjects => {
        res.send(subjects);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific subject
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Subject.findById(id).then(subject => {
        res.send(subject)
    })
});

// delete a subject
router.delete('/:id', (req, res) => {
    let id = req.params.id
    Subject.findByIdAndRemove(id).then(subject => {
        if (subject) {
            res.send({
                subject,
                notice: 'successfully deleted subject'
            });
        }
        else {
            res.send(404).send({
                notice: 'the subject already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a subject
router.post('/', (req, res) => {
    let body = req.body;
    let subject = new Subject(body);
    subject.save().then((subject) => {
        res.send(subject);
    })
        .catch(err => {
            res.send(err);
        })
});

// update a specific subject
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Subject.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(subject => {
            res.send(subject)
        }).catch(err => {
            res.send(err);
        })
})

module.exports = {
    subjectsController: router
}