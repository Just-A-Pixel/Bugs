// For Rendering /users/register and /users/login 

const express = require('express')
const router = express.Router();
const User = require('../models/User')
const validator = require('validator')
const Codechef = require('../models/Codechef-Members')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { forwardAuthenticated } = require('../config/auth');


// Register 
router.get('/register', (req, res) => {
    res.send(req.user) 
})

// Register
router.post('/register', async (req, res) => {
    // {name, email, password, password2} = req.body ;
    try {
        const email = req.body.email
        const checkUser = await User.findOne({email})

        if (checkUser){
            res.send('An User Already Exists')
            throw new Error('An User Already Exists !!')
        }
        const user = new User(req.body)
        
        if (user.password != user.password2){
            res.send('Password Must be Same ')
            throw new Error('Passwords Should be same !!')
        }

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, async (error, hash) => {
                if (error)
                    throw new Error(error)
                user.password = hash 
                user.password2 = hash 
                await user.save();
                res.send(user); 
            })
        })

    } catch (err) {
        console.log(err)
        res.send(err).status(404) 
    }
    
})

// For login Transfer 
router.get('/dashboard', async (req, res) => {     
    console.log('I am Successful redirect ')
    res.send('User Auth Granted Status : ' + req.isAuthenticated() + ' I am an Successful redirect ')
}) 

// For Failure Login Transfer
router.get('/failed', (req, res) => {
    res.send('Sorry , Please Try Again ')
})

// Login  
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/failed', 
      failureFlash: true
    })(req, res, next);
  })

// Logout 
router.get('/logout' , (req, res) => {
    req.logout();
    res.send('You have been Successfully Been Logged Out')
})

// Codechef Member 
router.post('/codechef', async (req, res) => {
    console.log(req.body)
    const codechef = new Codechef(req.body)
    await codechef.save()
    res.send(req.body)
})
  
module.exports = router ;