const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')

require('./database/mongoose')
require('./config/passport')(passport)
const app = express()


const PORT = process.env.PORT || 3000 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());



app.use('/', require('./routers/index'))
app.use('/users', require('./routers/users'))



app.listen(PORT, console.log(`Server Running on Port ${PORT}`))