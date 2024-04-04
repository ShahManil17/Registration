const router = require("express").Router();
const { auth } = require('./midelwer/auth');

router.get('/fetchTask', (req, res)=> {
    res.render('../views/fetchTask_view/display');
})

router.get('/fetchTask/allData', (req, res)=> {
    if(req.query.sid < 1 || req.query.sid > 100) {
        res.send('Invalid Id Received');
        res.end();
    }
    else {
        res.render('../views/fetchTask_view/alldata', {sid:req.query.sid})
    }
})

module.exports = router