const express = require('express');
const router = express.Router();

const { departmentsController } = require('../app/controllers/departments-controller');
const { usersController } = require('../app/controllers/users-controller');

router.use('/departments', departmentsController);
router.use('/users', usersController);

module.exports = {
    routes: router
}