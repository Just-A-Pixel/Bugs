// For Rendering Google Account

const express = require('express')
const passport = require('passport')
const Codechef = require('../models/Codechef-Members')
const User = require('../models/User-Google')

const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/redirect', passport.authenticate('google'), async (req, res, next) => {
    user = req.user
    console.log("Authenticated : ",req.isAuthenticated())
    console.log(user)
    var email = user.email
    const codechef = await Codechef.find({email})
    if (codechef){
      const update = await User.updateOne({googleId: user.googleId}, {$set: {isCodechef: true} })
      console.log(update)
      res.send("User Identified as Codechef - Member ") 
    } 
 
});    


module.exports = router ;