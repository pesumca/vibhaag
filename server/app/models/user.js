const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function () {
                return 'Invalid email format'
            }
        }
    },
    roles: {
        type: String,
        enum: ['admin', 'principal', 'chairperson', 'faculty'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        access: {
          type: String,
          require: true
        },
        token: {
          type: String,
          require: true
        }
    }]
});



userSchema.methods.generateAuthToken = function () {
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString()
    // console.log(token)

    user.tokens = user.tokens.concat([{ access, token }])

    return user.save().then(() => {
        return token
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}