const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://mongo:27017/server', { useNewUrlParser: true });

module.exports = mongoose;