const express = require('express');
const router = express.Router();

const { batchesController } = require('../app/controllers/batches-controller');
const { departmentsController } = require('../app/controllers/departments-controller');
const { semestersController } = require('../app/controllers/semesters-controller');
const { sessionsController } = require('../app/controllers/sessions-controller');
const { subjectsController } = require('../app/controllers/subjects-controller');
const { timetablesController } = require('../app/controllers/timetables-controller');
const { usersController } = require('../app/controllers/users-controller');
const { authController } = require('../app/controllers/auth-controller');

router.use('/batches', batchesController);
router.use('/departments', departmentsController);
router.use('/semesters', semestersController);
router.use('/sessions', sessionsController);
router.use('/subjects', subjectsController);
router.use('/timetablesController', timetablesController);
router.use('/users', usersController);
router.use('/auth', authController);

module.exports = {
    routes: router
}