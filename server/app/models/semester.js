const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
    number: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
})

const Semester = mongoose.model('Semester', SemesterSchema);

module.exports = {
    Semester
}