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
    },
    uid: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function () {
                return 'Invalid email format';
            }
        }
    },
    roles: {
        type: String,
        enum: ['admin', 'principal', 'chairperson', 'faculty'],
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

    // user.tokens = user.tokens.concat([{ access, token }]) // this will concatenate new token to the document after every login
    
    user.tokens = [{ access, token }] // replaces old token with new one

    return user.save().then(() => {
        return token
    })
}

userSchema.statics.findByCredentials = function(email, password) {
    var User = this
    // console.log('inside findbycred')
    // console.log(email)
    // console.log(password)

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        // console.log('found email')

        return new Promise((resolve, reject) => {
            
            // console.log(password)
            // console.log(user.password)
            
            bcrypt.compare(password, user.password, (err, res) => {

                if (res) {
                    resolve(user)
                } else {
                    reject();
                }
            })
        })
    })
}

userSchema.pre('save', function(next) {
    var user = this

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}