const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
var flash = require('connect-flash');
const session = require('express-session');


require('./database/mongoose')
require('./config/passport')(passport)
const app = express()


const PORT = process.env.PORT || 3000 

app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

app.use('/', require('./routers/index'))
app.use('/users', require('./routers/users'))



app.listen(PORT, console.log(`Server Running on Port ${PORT}`))