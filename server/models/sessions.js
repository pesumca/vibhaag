const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    start: {
        type: Date,
        default: Date.now   
    },
    end: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
})

const Sessions = mongoose.model('Sessions',SessionSchema);

module.exports = {
    Sessions
}
