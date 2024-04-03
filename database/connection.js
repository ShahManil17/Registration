const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'merge_db'
});

con.connect(function (err) {
    if(err) console.log(err);
});

module.exports = con