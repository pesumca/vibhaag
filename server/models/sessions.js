const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Scheema = mongoose.Schema;

const SessionScheema = new Scheema({
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

const Sessions = mongoose.model('Sessions',SessionScheema);

module.exports = {
    Sessions
}
