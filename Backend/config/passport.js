const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const passport = require('passport')

module.exports = function (passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
            
            const user = await User.findOne({email: email })
            if (!user)
                return done (null, false, {message: 'Email is not Registered '})
            
                

        })
    )
}