const express = require('express')
const router = express.Router();
const Bugs = require('../models/BugsModel');
const User = require('../models/User-Google')
const {ensureAuthenticated} = require('../config/auth')


// Getting All the Projects 
router.get('/allprojects',async (req, res) => {
    const bugs = await Bugs.find({})
    console.log(bugs)  
    project = [] 
    bugs.forEach((bug) => {
        project.push(bug.project)
    })  
    res.json(project) 
})

// Get all Bug Issue Ids for a Specific Project, Will Help in Frontend for Updation using Ids 
router.get('/issueid/:id', async (req, res) => {
    var id = req.params.id 
    const bugs = await Bugs.find({_id: id})
    issues = []
    bugs.forEach((bug) => { 
        console.log(bug.alpha)
        bug.alpha.forEach((scrap) => {
            issues.push(scrap._id)
        })
    }) 
    res.json(issues)
}) 

router.get('/bug/:id', async(req, res) => { 
    var project = req.params.id ;
    
    if (project == 'all'){
        const report = await Bugs.find({})
        res.json(report)
    }
    try {
        const report = await Bugs.findOne({
            project
        })
        if (report){
            console.log(report)
            res.json(report)
        }
    } catch(e){
        console.log(e);
        res.json(e)
    }
})


router.post('/reportbug',async (req, res) => {
    console.log(req.body)
    var project = req.body.project
    var title = req.body.title
    var description = req.body.description
    var issuedby = req.body.issuedby
    var template = {
        title,
        description,
        issuedby
    }
    try {
        const bug = await Bugs.findOne({
            project
        })

        if (!bug) {
            const bugs = new Bugs({
                project,
            })
            bugs.alpha.push(template)
            await bugs.save();
            res.json(bugs)
        } else {
            bug.alpha.push(template)
            await bug.save();
            res.json(bug)
        }
    } catch (e) {
        console.log(e)
    }
})

router.patch('/updatebug/:id',async (req, res) => {
    
    var id = req.params.id 
    
    try {
        const bug = await Bugs.findOne({ "alpha._id": id})
        const {title, description} = req.body
        if (bug){
            // console.log(bug.alpha[0]._id)
            const ans = await bug.alpha
            var t = 0 ;

            for(var i = 0 ; i < ans.length ; i++ ){
                if (ans[i]._id == id){
                    if (title)
                        ans[i].title = title 
                    if (description)
                        ans[i].description = description
                    t = i ;
                }
            }
            bug.alpha[t] = ans[t];
            await bug.save() 
            res.json(bug.alpha[t])        
        }else {
            res.json("Not Found")
        }
    }catch (e){
        res.json(e)
        console.log(e)
    }
})

router.delete('/deletebug/:id' ,async(req, res) => {
    var id = req.params.id 
    try {
        const bug = await Bugs.findOne({ "alpha._id": id})
        if (bug){
            const ans = await bug.alpha
            var filtered = ans.filter(function(value, index, arr){ return (value._id != id)})
            bug.alpha = filtered 
            await bug.save()
            res.json(bug.alpha) 
            console.log(filtered)
        }else {
            res.json("Not Found")
        }  
    }catch (err){
        console.log(err)
        res.json(err)
    }
})

router.patch('/postcomment/:id', async (req, res) => {
    var id = req.params.id  
    const {comments} = req.body
    
    // Temp Setup --> Start 
    const user = await User.findOne({_id: "5f060580c1fb6fdf92dbb353"})
    req.user = user  
    // Temp Setup --> End 
    
    console.log(req.user.isCodechef) 
    if (req.user.isCodechef){
        try {
        
            const update = await Bugs.findOne({"alpha._id": id })
            
            const ans = await update.alpha
            var t = 0 ;
    
            for(var i = 0 ; i < ans.length ; i++ ){
                if (ans[i]._id == id){
                    ans[i].answer = comments
                    ans[i].issueSorted = true 
                    t = i ;
                }
            }
            update.alpha[t] = ans[t];
            await update.save() 
            res.json(update.alpha[t]) 
        }catch (err){
            console.log(err)
            res.json(err)
        }
    } else {
        res.json("Not Authorized")
    }
})

module.exports = router