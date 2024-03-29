const jwt = require('jsonwebtoken')

exports.auth =(req,res,next)=> {
    let token = req.cookies.token || null
    if(token) {
        try {
            const decode = jwt.verify(token, "manil")
            next();
        } catch (error) {
            res.redirect("/loginPage")
        }
    }
    else {
        res.redirect("/loginPage")
    }
}