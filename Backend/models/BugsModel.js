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
        },
        issuedby: {
            type: String,
            required: false 
        },
        answer: {
            type: String, 
            required: false
        },
        issueSorted: {
            type: Boolean,
            default: false,
            required: false 
        }
    }]
})

module.exports = mongoose.model('Bugs', bugsSchema)