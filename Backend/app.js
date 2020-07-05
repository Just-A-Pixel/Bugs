const express = require('express');
const bodyParser = require('body-parser')

require('./database/mongoose')
const app = express()

const PORT = process.env.PORT || 3000 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', require('./routers/index'))
app.use('/users', require('./routers/users'))



app.listen(PORT, console.log(`Server Running on Port ${PORT}`))