const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Batch } = require('../models/batch');

// get all the batch
router.get('/', (req, res) => {
    Batch.find().populate('semester').then(batches => {
        res.send(batches);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific Batch
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Batch.findById(id).populate('semester').then(batch => {
        res.send(batch)
    })
});

// delete a Batch
router.delete('/:id', (req, res) => {
    let id = req.params.id
    Batch.findByIdAndRemove(id).then(batch => {
        if (batch) {
            res.send({
                batch,
                notice: 'successfully deleted batch'
            });
        }
        else {
            res.send(404).send({
                notice: 'the batch already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a batch
router.post('/', (req, res) => {
    let body = req.body;
    let batch = new Batch(body);
    batch.save().then((batch) => {
        res.send(batch);
    })
        .catch(err => {
            res.send(err);
        })
});

// update a specific batch
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Batch.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(batch => {
            res.send(batch)
        }).catch(err => {
            res.send(err);
        })
})


module.exports = {
    batchesController: router
}