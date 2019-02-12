let keys = {};

if(process.argv.slice(2) == 'development'){
    keys['apiUrl'] = "http://localhost:3000";
    keys['contentType'] = "application/json";
    keys['MONGODB_URI'] = "mongodb://localhost:27017/vibhaag"
}

if(process.argv.slice(2) == 'staging'){
    keys['apiUrl'] = "/";
    keys['contentType'] = "application/json";
    keys['MONGODB_URI'] = "mongodb+srv://nsudhanva:sudhanva@vibhaag-kvrrr.mongodb.net/test?retryWrites=true"
}

if(process.argv.slice(2) == 'production'){
    keys['apiUrl'] = "/";
    keys['contentType'] = "application/json";
    keys['MONGODB_URI'] = "mongodb+srv://nsudhanva:sudhanva@vibhaag-kvrrr.mongodb.net/test?retryWrites=true"
}

exports.keys = keys;