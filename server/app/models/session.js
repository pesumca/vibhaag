const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    batch: {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
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

const Session = mongoose.model('Session', SessionSchema);

module.exports = {
    Session
}
