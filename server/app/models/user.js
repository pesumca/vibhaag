const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value);
            },
            message: function(){
                return 'Invalid email format'
            }
        }
    },
    roles: {
        type: String,
        enum:['admin','principal','chairperson','faculty'],
        required: true
    },
    password:{
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type: String
            }
        }
    ]
});

const User = mongoose.model('User', userSchema)

module.exports={
    User
}