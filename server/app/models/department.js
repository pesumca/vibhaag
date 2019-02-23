const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departmentCode:{
        type: String,
        required: true
    },
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