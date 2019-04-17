const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
    name: {
        type: String,
    },
    noOfStudents: {
        type: Number,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: 'Semester'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

const Batch = mongoose.model('Batch', BatchSchema);

module.exports = {
    Batch
}