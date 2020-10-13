const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleId: {
        type: String,
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },
    isCodechef: {
        type: Boolean
    },
    token : {
        type: String
    }
});
module.exports = mongoose.model('UserGoogle', userSchema);
