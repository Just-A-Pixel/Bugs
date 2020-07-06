const express = require('express')
const router = express.Router();
const bugs = require('../models/BugsModel');
const BugsModel = require('../models/BugsModel');

router.post('/reportbug', (req, res) => {
    console.log(req.body)
    const bugs = new BugsModel(req.body)
    
})

module.exports = router 