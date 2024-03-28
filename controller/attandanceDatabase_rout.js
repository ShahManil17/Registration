const router = require("express").Router();
const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'merge_db'
});

var ct=0;
var pg=1;
var day=31;
var month=12;
var year=2023;
var temp=0;

router.get('/attandanceDatabase', (req, res)=> {
    console.log(temp);
    if(req.query.month || req.query.year) {
        month=req.query.month;
        year=req.query.year;
        if(month == 12 || month == 1) {
            day=31;
        }
        else {
            day=29;
            temp = 0;
        }
    }
    ct = 0;
    pg = 1;
    let sql = `select s.sid, s.f_name, s.l_name, count(e.id) as count, (count(e.id)*100)/${day} as percentage from student_master as s , att_master as e where e.id = s.sid && e.status = 'p' && e.dt between "${year}-${month}-1" and "${year}-${month}-${day}" group by e.id order by e.id LIMIT 5 OFFSET ${ct}`;
    con.query(sql, (err, result)=> {
        if(err) throw err;
        res.render('../views/attandanceDatabase_view/disp', {data:result, no: pg, month:month, year:year, temp:temp});
    })
})

router.get('/attandanceDatabase/move/:abc', (req, res)=> {
    if(req.params.abc == 'next') {
        ct+=5;
        pg++;
        temp=1;
        let sql = `select s.sid, s.f_name, s.l_name, count(e.id) as count, (count(e.id)*100)/${day} as percentage from student_master as s , att_master as e where e.id = s.sid && e.status = 'p' && e.dt between "${year}-${month}-1" and "${year}-${month}-${day}" group by e.id order by e.id LIMIT 5 OFFSET ${ct}`;
        con.query(sql, (err, result)=> {
            if(err) throw err;
            res.render('../views/attandanceDatabase_view/disp', {data:result, no: pg, month:month, year:year, temp:temp});
        })
    }
    else if(req.params.abc == 'prev'){
        ct-=5;
        pg--;
        let sql = `select s.sid, s.f_name, s.l_name, count(e.id) as count, (count(e.id)*100)/${day} as percentage from student_master as s , att_master as e where e.id = s.sid && e.status = 'p' && e.dt between "${year}-${month}-1" and "${year}-${month}-${day}" group by e.id order by e.id LIMIT 5 OFFSET ${ct}`;
        con.query(sql, (err, result)=> {
            if(err) throw err;
            res.render('../views/attandanceDatabase_view/disp', {data:result, no: pg, month:month, year:year, temp:temp});
        })
    }
    else if(req.params.abc == 'home'){
        ct = 0;
        pg = 1;
        let sql = `select s.sid, s.f_name, s.l_name, count(e.id) as count, (count(e.id)*100)/${day} as percentage from student_master as s , att_master as e where e.id = s.sid && e.status = 'p' && e.dt between "${year}-${month}-1" and "${year}-${month}-${day}" group by e.id order by e.id LIMIT 5 OFFSET ${ct}`;
        con.query(sql, (err, result)=> {
            if(err) throw err;
            res.render('../views/attandanceDatabase_view/disp', {data:result, no: pg, month:month, year:year, temp:temp});
        })
    }
    else if(req.params.abc == 'end'){
        ct = 25;
        pg = 6;
        let sql = `select s.sid, s.f_name, s.l_name, count(e.id) as count, (count(e.id)*100)/${day} as percentage from student_master as s , att_master as e where e.id = s.sid && e.status = 'p' && e.dt between "${year}-${month}-1" and "${year}-${month}-${day}" group by e.id order by e.id LIMIT 5 OFFSET ${ct}`;
        con.query(sql, (err, result)=> {
            if(err) throw err;
            res.render('../views/attandanceDatabase_view/disp', {data:result, no: pg, month:month, year:year, temp:temp});
        })
    }
})

module.exports = router