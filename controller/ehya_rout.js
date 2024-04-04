const router = require("express").Router();
const { auth } = require('./midelwer/auth');

router.get('/ehya', auth, (req, res)=> {
    res.render('../views/ehya_view/ehya')
})

module.exports = router