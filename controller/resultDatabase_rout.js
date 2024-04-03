const router = require("express").Router();
// const mysql = require("mysql");
const con = require('../database/connection');

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'merge_db'
// });

var ct=0;
var pg=1;
var q = `select student_master.sid,student_master.f_name,student_master.l_name, 
            sum(distinct if(result_master.exam_id='1',result_master.prac_obtain,null) ) as terminal_practical,
            sum(distinct if(result_master.exam_id='1',result_master.theory_obtain,null) ) as terminal_theory, 
            sum(distinct if(result_master.exam_id='2',result_master.prac_obtain,null) ) as prelim_practical, 
            sum(distinct if(result_master.exam_id='2',result_master.theory_obtain,null) ) as prelim_theory, 
            sum(distinct if(result_master.exam_id='3',result_master.prac_obtain,null) ) as final_practical, 
            sum(distinct if(result_master.exam_id='3',result_master.theory_obtain,null) ) as final_theory
            from student_master
            INNER JOIN result_master 
            ON student_master.sid=result_master.sid group by student_master.sid LIMIT ?,50;`;

router.get('/resultDatabase', (req, res)=> {
    if(req.query.id == undefined) {
        ct = 0;
        pg = 1;
        con.query(q, [ct], (err, result)=> {
            if(err) throw err;
            res.render('../views/resultDatabase_view/disp', {data:result, no: pg, counter:ct});
        })
    }
    else if(req.query.id == 'next') {
        ct=parseInt(req.query.ct)+50;
        pg=parseInt(req.query.pg)+1;
        con.query(q, [ct], (err, result)=> {
            if(err) throw err;
            res.render('../views/resultDatabase_view/disp', {data:result, no: pg, counter:ct});
        })
    }    
    else if(req.query.id == 'prev') {
        ct=parseInt(req.query.ct)-50;
        pg=parseInt(req.query.pg)-1;
        con.query(q, [ct], (err, result)=> {
            if(err) throw err;
            res.render('../views/resultDatabase_view/disp', {data:result, no: pg, counter:ct});
        })
    }
    else if(req.query.id == 'home') {
        ct=0;
        pg=1;
        con.query(q, [ct], (err, result)=> {
            if(err) throw err;
            res.render('../views/resultDatabase_view/disp', {data:result, no: pg, counter:ct});
        })
    }
    else if(req.query.id == 'end') {
        ct=150;
        pg=4;
        con.query(q, [ct], (err, result)=> {
            if(err) throw err;
            res.render('../views/resultDatabase_view/disp', {data:result, no: pg, counter:ct});
        })
    }
})

router.get('/allData/:id', (req, res)=> {
    var all = `select student_master.sid,student_master.f_name, student_master.l_name,result_master.theory_obtain, result_master.prac_obtain, result_master.exam_id, result_master.sub_id from student_master,result_master where student_master.sid=result_master.sid && result_master.sid=${req.params.id} && (result_master.exam_id='1' || result_master.exam_id='2' || result_master.exam_id='3');`;
    con.query(all, (err, result)=> {
        res.render('../views/resultDatabase_view/allDetails', {data:result})
    })
})

module.exports = router