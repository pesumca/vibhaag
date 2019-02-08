const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Timetable } = require('../models/timetable');

module.exports = {
    timetablesController: router
}