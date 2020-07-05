const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/bugs-Auth', {
    useNewUrlParser: true ,
    useCreateIndex: true ,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then( () => {
    console.log('MongoDB Connected !!')
}).catch( (err) => {
    console.log(err)
}) 