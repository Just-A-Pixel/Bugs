// For Rendering /users/register and /users/login 

const express = require('express')
const router = express.Router();

// Login 
router.get('/login', (req, res) => {
    res.send('Login');
})

// Register 
router.get('/register', (req, res) => {
})

router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body ;
    
    if (password != password2)
        
})

module.exports = router ;