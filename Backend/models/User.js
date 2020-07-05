const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String ,
        required : true,
        trim : true ,
        lowercase : true ,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    password : {
        type: String,
        required: true,
        validate (value) {
            if (value.length < 6 ){
                throw new Error ('Password Length Should be Greater than 6 ')
            }
        }
    },
    password2 : {
        type: String,
        required: true,
    },
})


const User = mongoose.model('User', UserSchema);

module.exports = User ;