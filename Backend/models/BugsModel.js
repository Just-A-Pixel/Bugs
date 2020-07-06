const mongoose = require('mongoose')

const bugsSchema = new mongoose.Schema({
    project: {
        type: String,
        require: true
    },
    alpha: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }]
})

module.exports = mongoose.model('Bugs', bugsSchema)