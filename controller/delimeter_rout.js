const router = require('express').Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'merge_db'
});

router.get('/delimeter', (req, res)=> {
    res.render('../views/delimeter_view/home');
})

router.post('/delimeter', (req, res)=> {

    var a = req.body.qr;

    var f_name = [];
    var l_name = [];
    var email = [];
    var state = [];
    var phno = [];
    var city = [];

    for(let i=0; i<a.length; i++) {
        switch(a[i]) {
            case '_':
                var temp=0;
                for(let j=i+1; j<=a.length; j++) {
                    if(a[j]=='_' || a[j]=='^' || a[j]=='$' || a[j]=='}' || a[j]=='{' || a[j]==':' || j==a.length) {
                        temp = j;
                        break;
                    }
                }
                var str = a.slice(i+1, temp)  
                if(str.trim() != '') {
                    f_name.push(str.trim());
                }
                break;

            case '^':
                var temp=0;
                for(let j=i+1; j<=a.length; j++) {
                    if(a[j]=='_' || a[j]=='^' || a[j]=='$' || a[j]=='}' || a[j]=='{' || a[j]==':' || j==a.length) {
                        temp = j;
                        break;
                    }
                }
                var str = a.slice(i+1, temp)
                if(str.trim() != '') {
                    l_name.push(str.trim());
                }
                break;

            case '$':
                var temp=0;
                for(let j=i+1; j<=a.length; j++) {
                    if(a[j]=='_' || a[j]=='^' || a[j]=='$' || a[j]=='}' || a[j]=='{' || a[j]==':' || j==a.length) {
                        temp = j;
                        break;
                    }
                }
                var str = a.slice(i+1, temp)
                if(str.trim() != '') {
                    email.push(str.trim());
                }
                break;

            case '}':
                var temp=0;
                for(let j=i+1; j<=a.length; j++) {
                    if(a[j]=='_' || a[j]=='^' || a[j]=='$' || a[j]=='}' || a[j]=='{' || a[j]==':' || j==a.length) {
                        temp = j;
                        break;
                    }
                }
                var str = a.slice(i+1, temp)
                if(str.trim() != '') {
                    state.push(str.trim());
                }
                break;

            case '{':
            var temp=0;
            for(let j=i+1; j<=a.length; j++) {
                if(a[j]=='_' || a[j]=='^' || a[j]=='$' || a[j]=='}' || a[j]=='{' || a[j]==':' || j==a.length) {
                    temp = j;
                    break;
                }
            }
            var str = a.slice(i+1, temp)
            if(str.trim() != '') {
                phno.push(str.trim());
            }
            break;

            case ':':
                var temp=0;
                for(let j=i+1; j<=a.length; j++) {
                    if(a[j]=='_' || a[j]=='^' || a[j]=='$' || a[j]=='}' || a[j]=='{' || a[j]==':' || j==a.length) {
                        temp = j;
                        break;
                    }
                }
                var str = a.slice(i+1, temp)
                if(str.trim() != '') {
                    city.push(str.trim());
                }
                break;
        }
    }

    var sql = `select * from student_master where `;


    if(f_name.length > 1) {
        sql+='(';
        for(let i=0; i<f_name.length; i++) {
            sql+=`f_name like '%${f_name[i]}%' or `;
        }
        sql = sql.slice(0, (sql.length-4))
        sql+=')';
        sql+=` and `;
    }
    else if(f_name.length == 1) {
        sql+=`f_name like '%${f_name[0]}%' and `;
    }

    if(l_name.length > 1) {
        sql+='(';
        for(let i=0; i<l_name.length; i++) {
            sql+=`l_name like '%${l_name[i]}%' or `;
        }
        sql = sql.slice(0, (sql.length-4))
        sql+=')';
        sql+=` and `;
    }
    else if(l_name.length == 1) {
        sql+=`l_name like '%${l_name[0]}%' and `;
    }

    if(email.length > 1) {
        sql+='(';
        for(let i=0; i<email.length; i++) {
            sql+=`email like '%${email[i]}%' or `;
        }
        sql = sql.slice(0, (sql.length-4))
        sql+=')';
        sql+=` and `;
    }
    else if(email.length == 1) {
        sql+=`email like '%${email[0]}%' and `;
    }

    if(state.length > 1) {
        sql+='(';
        for(let i=0; i<state.length; i++) {
            sql+=`state like '%${state[i]}%' or `;
        }
        sql = sql.slice(0, (sql.length-4))
        sql+=')';
        sql+=` and `;
    }
    else if(state.length == 1) {
        sql+=`state like '%${state[0]}%' and `;
    }

    if(phno.length > 1) {
        sql+='(';
        for(let i=0; i<phno.length; i++) {
            sql+=`phno like '%${phno[i]}%' or `;
        }
        sql = sql.slice(0, (sql.length-4))
        sql+=')';
        sql+=` and `;
    }
    else if(phno.length == 1) {
        sql+=`phno like '%${phno[0]}%' and `;
    }

    if(city.length > 1) {
        sql+='(';
        for(let i=0; i<city.length; i++) {
            sql+=`city like '%${city[i]}%' or `;
        }
        sql = sql.slice(0, (sql.length-4))
        sql+=')';
        sql+=` and `;
    }
    else if(city.length == 1) {
        sql+=`city like '%${city[0]}%' and `;
    }

    sql=sql.slice(0, sql.length-5);
    console.log(sql);

    con.query(sql, function(err, result, fields) {
        if(err) {
            res.send('Error In the Query');
        }
        res.render('../views/delimeter_view/show', {result:result, fields:fields, sql:sql, qr:a})
    })
})

module.exports = router