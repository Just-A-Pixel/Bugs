const mongoose = require('mongoose')

const bugsSchema = new mongoose.Schema({
    project: {
        type: String, 
        require: true 
    },
    title: {
        type: String,
        required: true 
    },
    description : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Bugs', bugsSchema)