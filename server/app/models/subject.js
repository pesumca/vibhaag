const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectCode: {
        type: String,
        minlength: 1,
        maxlength: 20
    },
    name: {
        type: String,
    },
    description: {
        type: String,
        minlength: 4
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = {
    Subject
} 