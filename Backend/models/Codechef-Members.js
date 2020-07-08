const mongoose = require('mongoose')

const codechefSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Codechef', codechefSchema)