const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
    },
    departmentCode: {
        type: String,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    semesters: [{
        type: Schema.Types.ObjectId,
        ref: 'Semester'
    }],
    batches: [{
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = {
    Department
}