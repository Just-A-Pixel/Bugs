const mongoose = require('mongoose')

const bugsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description : {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('Bugs', bugsSchema)