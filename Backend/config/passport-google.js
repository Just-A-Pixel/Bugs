const passport = require('passport');
const mongoose = require('mongoose')
const User = require('../models/User-Google');
require('dotenv').config();


var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID:  process.env.CLIENTID,
        clientSecret:  process.env.CLIENTSECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile._json.email
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);