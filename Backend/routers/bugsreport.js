const express = require('express')
const router = express.Router();
const Bugs = require('../models/BugsModel');
const { report } = require('./users');

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


router.post('/reportbug', async (req, res) => {
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

router.patch('/updatebug/:id', async (req, res) => {
    
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
        console.log(e)
    }
})

module.exports = router