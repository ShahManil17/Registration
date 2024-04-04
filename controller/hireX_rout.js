const router = require("express").Router();
const { auth } = require('./midelwer/auth');

router.get('/hireX', auth, (req, res)=> {
    res.render('../views/hireX_view/practical3')
})

module.exports = router