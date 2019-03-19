const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Department } = require('../models/department');

// get all the departments
router.get('/', (req, res) => {
    Department.find().populate('subjects').populate('users').populate('sessions').then(departments => {
        res.send(departments);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific department
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Department.findById(id).populate('subjects').populate('users').populate('sessions').then(department => {
        res.send(department);
    })
});

// delete a department
router.delete('/:id', (req, res) => {
    let id = req.params.id
    Department.findByIdAndRemove(id).then(department => {
        if (department) {
            res.send({
                department,
                notice: 'successfully deleted department'
            });
        }
        else {
            res.send(404).send({
                notice: 'the department already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a department
router.post('/', (req, res) => {
    let body = req.body;
    let department = new Department(body);
    department.save().then((department) => {
        res.send(department);
    })
        .catch(err => {
            res.send(err);
        })
});

// update a specific department
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Department.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(department => {
            res.send(department)
        }).catch(err => {
            res.send(err);
        })
})

module.exports = {
    departmentsController: router
}