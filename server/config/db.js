const mongoose = require('mongoose');
const allKeys = require('./keys');
mongoose.Promise = global.Promise;

const MONGODB_URI = allKeys.keys.MONGODB_URI;

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