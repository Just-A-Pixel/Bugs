// For Rendering Homepages 

const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('HomePage is being Rendered ');
})

module.exports = router ;