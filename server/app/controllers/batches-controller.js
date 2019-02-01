const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Batch } = require('../models/batch');

module.exports = {
    batchesController: router
}