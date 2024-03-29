const router = require("express").Router();
const mysql = require("mysql");
const { auth } = require("./midelwer/auth");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'merge_db'
});

var ct=0;
var srt = `sid`;
var temp=0;

router.get('/showDetails',auth, (req, res)=> {
    ct=0;
    // if(temp != 0) {
    //     srt=req.query.id;
    //     console.log(srt+ "In if");
    // }
    if(req.query.id) {
        srt=req.query.id;
    }
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        console.log("Req "+req.query.id);
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
    console.log("Ct : "+ct);
    temp++;
})

router.post('/next',auth, (req, res)=> {
    ct+=200;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })

    console.log("In Next : "+ct);
})

router.post('/prev',auth, (req, res)=> {
    ct-=200;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })

    console.log("In Prev : "+ct);
})

router.post('/home',auth, (req, res)=> {
    ct=0;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
    console.log("In Home : "+ct);
})

router.post('/end',auth, (req, res)=> {
    ct=49800;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
    console.log("In End : "+ct);
})

module.exports = router