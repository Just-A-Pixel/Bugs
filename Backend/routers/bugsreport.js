const express = require('express')
const router = express.Router();
const Bugs = require('../models/BugsModel');
const {ensureAuthenticated} = require('../config/auth')


router.get('/bug/:id', async(req, res) => { 
    var project = req.params.id ;
    
    if (project == 'all'){
        const report = await Bugs.find({})
        res.send(report)
    }
    try {
        const report = await Bugs.findOne({
            project
        })
        if (report){
            console.log(report)
            res.send(report)
        }
    } catch(e){
        console.log(e);
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
            res.send(bugs)
        } else {
            bug.alpha.push(template)
            await bug.save();
            res.send(bug)
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
            res.send(bug.alpha[t])        
        }else {
            res.send("Not Found")
        }
    }catch (e){
        res.send(e)
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
            res.send(bug.alpha) 
            console.log(filtered)
        }else {
            res.send("Not Found")
        }  
    }catch (err){
        console.log(err)
        res.send(err)
    }
})

router.patch('/postcomment/:id', async (req, res) => {
    var id = req.params.id  
    const {comments} = req.body 
    console.log(req.user)
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
        res.send(update.alpha[t]) 
    }catch (err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router