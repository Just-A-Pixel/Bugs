const passport = require('passport');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const User = require('../models/User-Google');
const JWT = require('jsonwebtoken')
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                console.log('user is: ', currentUser);
                const token = jwt.sign({
                    _id : currentUser._id ,
                    name : currentUser.name,
                    email : currentUser.email,
                }, process.env.JWTTOKEN, {expiresIn:"1d"})
                User.findById(currentUser._id).then((check) => {
                    check.token = token    
                    check.googleId = profile.id,
                    check.save().then((user) => {
                        console.log('user is: ', currentUser);
                        done(null, user)
                    }).catch((e) => console.log(e))
                })
                // done(null, currentUser);
            } else {
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile._json.email,
                    isCodechef: false
                }).save().then((newUser) => {
                    const token = jwt.sign({
                        _id : newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    }, process.env.JWTTOKEN, {expiresIn: "1d"})
                    User.findById(newUser._id).then((check) => {
                        check.token = token
                        check.save().then((user) => {console.log('created new user: ', newUser);
                        done(null, user)}).catch((e) => console.log(e)).catch((e) => console.log(e))
                    })
                    // console.log('created new user: ', newUser);
                    // done(null, newUser);
                });
            }
        });
    })
);