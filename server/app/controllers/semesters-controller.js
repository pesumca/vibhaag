const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Semester } = require('../models/semester');

// get all the semester
router.get('/', (req, res) => {
    Semester.find().populate('department').then(semesters => {
        res.send(semesters);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific Semester
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Semester.findById(id).populate('department').then(semester => {
        res.send(semester)
    })
});

// delete a semester
router.delete('/:id', (req, res) => {
    let id = req.params.id
    Semester.findByIdAndRemove(id).then(semester => {
        if (semester) {
            res.send({
                semester,
                notice: 'successfully deleted semester'
            });
        }
        else {
            res.send(404).send({
                notice: 'the semester already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a semester
router.post('/', (req, res) => {
    let body = req.body;
    let semester = new Semester(body);
    semester.save().then((semester) => {
        res.send(semester);
    })
        .catch(err => {
            res.send(err);
        })
});

// update a specific semester
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Semester.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(semester => {
            res.send(semester)
        }).catch(err => {
            res.send(err);
        })
})

module.exports = {
    semestersController: router
}