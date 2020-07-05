// For Rendering /users/register and /users/login 

const express = require('express')
const router = express.Router();
const User = require('../models/User')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// Login 
router.get('/login', (req, res) => {
    res.send('Login');
})

// Register 
router.get('/register', (req, res) => {
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

    } catch (error) {
        res.send(error).status(404)
    }
    
})

// Login 
router.post('/login ', (req, res) => {

})

module.exports = router ;