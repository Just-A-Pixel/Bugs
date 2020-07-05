const express = require('express');

const app = express()

const PORT = process.env.PORT || 3000 


app.use('/', require('./routers/index'))
app.use('/users', require('./routers/users'))



app.listen(PORT, console.log(`Server Running on Port ${PORT}`))