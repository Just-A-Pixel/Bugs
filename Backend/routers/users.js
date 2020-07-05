// For Rendering /users/register and /users/login 

const express = require('express')
const router = express.Router();
const User = require('../models/User')
const validator = require('validator')
const bcrypt = require('bcryptjs')


// Login 
router.get('/login', (req, res) => {
    res.send('Login');
})

// Register 
router.get('/register', (req, res) => {
})

router.post('/register', async (req, res) => {
    // {name, email, password, password2} = req.body ;
    
    const email = req.body.email
    const checkUser = await User.findOne({email})

    if (checkUser)
        throw new Error('An User Already Exists !!')
    
    const user = new User(req.body)
    
    if (user.password != user.password2)
        throw new Error('Passwords Should be same !!')
    
    await user.save(); 

    res.send(user);
})

module.exports = router ;