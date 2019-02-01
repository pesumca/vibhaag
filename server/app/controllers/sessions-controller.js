const express = require('express');
const router = express.Router();

const _ = require('lodash');
const { Session } = require('../models/session');

module.exports = {
    sessionsController: router
}