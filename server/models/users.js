const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');

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
    }
});

const Users = mongoose.model('user',userSchema)

module.exports={
    Users
}