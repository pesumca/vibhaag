const mongoose = require('mongoose');
const keys = require('./keys');
mongoose.Promise = global.Promise;

const MONGODB_URI = 'mongodb://localhost:27017/vibhaag';
// const MONGODB_URI = keys.keys.MONGODB_URI;
// const MONGODB_URI = "mongodb+srv://nsudhanva:sudhanva@vibhaag-kvrrr.mongodb.net/test?retryWrites=true";

mongoose.connect(`${MONGODB_URI}`, { 
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;