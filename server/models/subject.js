const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectCode: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 4,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

const Subjects = mongoose.model('Subjects',subjectSchema);

module.exports = {
    Subjects
}