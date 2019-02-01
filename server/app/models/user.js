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
        required: true,
        maxlength: 20,
        minlength: 4
    },
    tokens: [
        {
            token:{
                type: String
            }
        }
    ]
});

const Users = mongoose.model('Users',userSchema)

module.exports={
    Users
}