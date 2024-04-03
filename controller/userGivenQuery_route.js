const router = require("express").Router();
// const mysql = require("mysql");
const { route } = require("./delimeter_rout");
const { auth } = require("./midelwer/auth");
const con = require('../database/connection');

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'merge_db'
// });

var temp=0;
var msg='';
var ct=0;
var lmt=5; 
var no=1;
var que='';

router.get('/userQuery', (req, res)=> {
    msg='';
    temp=0;
    res.render('../views/userGivenQuery_view/query', {temp:temp, msg:msg});
})

router.post('/show',auth, (req, res)=> {    
    temp=0;

    if(req.query.id == undefined) {
        ct=0;
        lmt=5; 
        no=1;
        que=req.body.ip;
        
        con.query(req.body.ip, function(err, result, fields) {
            if(err) {
                temp=-1;
                msg=`Previous Query can't be executed`;
                res.render('query', {temp:temp, msg:msg})
            }
            else {
                ct=0;
                lmt=5;
                res.render('../views/userGivenQuery_view/dy_paging', {result:result, fields:fields, no:no, ct:ct, lmt:lmt});  
            }
        })
    }
})

router.get('/move',auth, (req, res)=> {
    if(req.query.id == 'next') {
        con.query(que, function(err, result, fields) {
            ct=parseInt(req.query.ct)+5;
            lmt=parseInt(req.query.lmt)+5; 
            no=Math.floor(ct/5)+1;
            if(err) {
                temp=-1;
                msg=`Previous Query can't be executed`;
                res.render('../views/userGivenQuery_view/query', {temp:temp, msg:msg})
            }
            else {
                res.render('../views/userGivenQuery_view/dy_paging', {result:result, fields:fields, no:no, ct:ct, lmt:lmt});  
            }
        })
    }
    else if(req.query.id == 'prev') {
        con.query(que, function(err, result, fields) {
            ct=parseInt(req.query.ct)-5;
            lmt=ct+5; 
            no=Math.floor(ct/5)+1;
            if(err) {
                temp=-1;
                msg=`Previous Query can't be executed`;
                res.render('../views/userGivenQuery_view/query', {temp:temp, msg:msg})
            }
            else {
                res.render('../views/userGivenQuery_view/dy_paging', {result:result, fields:fields, no:no, ct:ct, lmt:lmt});  
            }
        })
    }
    else if(req.query.id == 'end') {
        con.query(que, function(err, result, fields) {
                ct=result.length-5;
                lmt=ct+5; 
                no=Math.floor(ct/5)+1;
            if(result.length%5 != 0) {
                ct = result.length-(result.length%5);
            }
            if(err) {
                temp=-1;
                msg=`Previous Query can't be executed`;
                res.render('../views/userGivenQuery_view/query', {temp:temp, msg:msg})
            }
            else {
                res.render('../views/userGivenQuery_view/dy_paging', {result:result, fields:fields, no:no, ct:ct, lmt:lmt});  
            }
        })
    }
    else if(req.query.id == 'home') {
        con.query(que, function(err, result, fields) {
            ct=0;
            lmt=5; 
            no=Math.floor(ct/5)+1;
            if(err) {
                temp=-1;
                msg=`Previous Query can't be executed`;
                res.render('../views/userGivenQuery_view/query', {temp:temp, msg:msg})
            }
            else {
                res.render('../views/userGivenQuery_view/dy_paging', {result:result, fields:fields, no:no, ct:ct, lmt:lmt});  
            }
        })
    }
})

router.get('/short',auth, (req, res)=> {
    que+=` orderby ${req.query.nm}`;
    con.query(que, function(err, result, fields) {
        ct=0;
        lmt=5; 
        no=Math.floor(ct/5)+1;
        res.render('../views/userGivenQuery_view/dy_paging', {result:result, fields:fields, no:no, ct:ct, lmt:lmt});
    })
})

module.exports = router