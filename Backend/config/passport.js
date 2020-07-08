const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const passport = require('passport')
var flash = require('connect-flash');


module.exports = function (passport){

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
    });

    passport.use(
        new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
            
            try {
                
                const user = await User.findOne({email: email })
                
                if (!user)
                    return done (null, false, {message: 'Email is not Registered '})
                
                
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error){
                        res.send('Error : Password Doesn\'t Matches ')
                        throw error 
                    }
    
                    if (isMatch){
                        return done (null, user)
                    } else {
                        return done (null, false, {message: 'Password Incorrect!!'})
                    }
    
                })

            }catch(error){
                console.log('Error Has Been Encountered ' + error);
            }

        })
    )
}