const router = require("express").Router();
// const mysql = require("mysql");
const con = require('../database/connection');
const { auth } = require("./midelwer/auth");

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'merge_db'
// });

var ct=0;
var srt = `sid`;
var temp=0;

router.get('/showDetails',auth, (req, res)=> {
    ct=0;
    if(req.query.id) {
        srt=req.query.id;
    }
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
    temp++;
})

router.post('/next',auth, (req, res)=> {
    ct+=200;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
})

router.post('/prev',auth, (req, res)=> {
    ct-=200;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
})

router.post('/home',auth, (req, res)=> {
    ct=0;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
})

router.post('/end',auth, (req, res)=> {
    ct=49800;
    con.query(`select * from student_master ORDER BY ${srt} limit 200 offset ?`,[ct], function(err, result) {
        let no = (ct/200)+1;
        res.render('../views/sortPagging_view/data', {data: result, no: no});
    })
})

module.exports = router