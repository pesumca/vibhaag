const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        require: true
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