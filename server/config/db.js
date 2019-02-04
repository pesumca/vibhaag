const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MONGODB_URI = 'mongodb://localhost:27017/vibhaag';

// mongoose.connect('mongodb://mongo:27017/server', { useNewUrlParser: true });

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