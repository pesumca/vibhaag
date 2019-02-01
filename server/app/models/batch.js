const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const BatchesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    noOfStudents:{
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

const Batches = mongoose.model('Batches',BatchesSchema);

module.exports = {
    Batches
}