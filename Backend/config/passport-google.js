const passport = require('passport');
const mongoose = require('mongoose')
const User = require('../models/User');
require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, 

  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({googleId: profile.id})
    if (user){
      console.log('user is: ', user);
      done(null, currentUser);
    } else {
      newUser = new User ({
        _id: new mongoose.Types.ObjectId(),
        googleId: profile.id,
        name: profile.displayName,
        email:profile._json.email,
        password: 'Google',
        password2: 'Google'
      })

      await newUser.save()
      console.log(newUser)
    }
  }
  
));
