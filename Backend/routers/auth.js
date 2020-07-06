// For Rendering Google Account

const express = require('express')
const passport = require('passport')

const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/redirect', passport.authenticate('google'),(req, res, next) => {
    user = req.user
    console.log("Authenticated : ",req.isAuthenticated())
    res.redirect('/users/dashboard')
});


module.exports = router ;