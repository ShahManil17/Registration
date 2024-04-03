const router = require('express').Router();
// const mysql = require('mysql');
const con = require('../database/connection');

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'merge_db'
// });

const executeQuery = (str, arr)=> {
        return new Promise((resolve, reject) => {
        con.query(str,arr, function(err, result) {
            if(err) reject(err);
            else {
                resolve(result);
            } 
                
        })
    })
}

router.get('/ajaxCity', async(req, res)=> {
    let result = await executeQuery('select * from state;', []);
    res.render('../views/ajaxCity_view/home', {result: result});
})

router.get('/getCities/:name', async(req, res)=> {
    let state = req.params.name;
    let str = `select city_name from city where s_id in (select s_id from state where state_name = ?);`
    let city_result = await executeQuery(str, [state]);
    res.send(city_result);
})

module.exports = router