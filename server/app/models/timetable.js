const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    batchName: {
        type: String,
        required: true,
    },
    day: [
        {
            first: {
                type: Date
            },
            second: {
                type: Date
            },
            third: {
                type: Date
            },
            fourth: {
                type: Date
            },
            fifth: {
                type: Date
            },
            sixth: {
                type: Date
            }
        }
    ]
});

const timetable = mongoose.model('timetable', timetableSchema);

module.exports = {
    timetable
}