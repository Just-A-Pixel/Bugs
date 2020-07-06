const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
var flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();
require('./config/passport-google')


require('./database/mongoose')
require('./config/passport')(passport)
const app = express()


const PORT = process.env.PORT || 3000 

app.use(flash());

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGOURI,
      collection: 'sessions'
    })
  }) 
);


  

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());



app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });  

app.use('/', require('./routers/auth'))
app.use('/users', require('./routers/users'))
app.use(require('./routers/auth'))



app.listen(PORT, console.log(`Server Running on Port ${PORT}`))