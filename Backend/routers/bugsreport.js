const express = require('express')
const router = express.Router();
const bugs = require('../models/BugsModel');
const BugsModel = require('../models/BugsModel');

router.post('/reportbug', async (req, res) => {
    console.log(req.body)
    var title = req.body.title
    
    var project = req.body.project
    var description = req.body.description
    
    var template = {title, description}

    const bugs = new BugsModel({
        project,
    })
    bugs.alpha.push(template)
    
    

    console.log(bugs)
    res.send(bugs)
})

module.exports = router 