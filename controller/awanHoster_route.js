const router = require("express").Router();
const { auth } = require('./midelwer/auth');

router.get('/awanHoster', auth, (req, res)=> {
    res.render('../views/awanHoster_view/practical2')
})

module.exports = router