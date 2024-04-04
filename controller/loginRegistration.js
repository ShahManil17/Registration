const router = require("express").Router();
// const mysql = require('mysql');
const con = require('../database/connection')
const md5 = require('md5');
const jwt = require("jsonwebtoken")

const ShortUniqueId = require('short-unique-id');
const { auth } = require('./midelwer/auth');

const uid = new ShortUniqueId();

const dateObject = new Date();

const vovCon = require('./js_exec/saperate_VowConst');
const oddEven = require('./js_exec/saperate_OddEven');
const groupBy = require('./js_exec/groupBy');
const fectorial = require('./js_exec/fectorial');
const vovInStr = require('./js_exec/vowelInStr');
const longestStr = require('./js_exec/longestStr_count');
const palindrom = require('./js_exec/palindrom');
const calc = require('./js_exec/calc');

const executeQuery = (str, arr) => {
    return new Promise((resolve, reject)=> {
        con.query(str, arr, function(err, result) {
            if(err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}

router.get('/', (req, res)=> {
    res.render('register');
})

router.post('/setData', async(req, res)=> {
    let data = req.body;
    let code = uid.rnd(12);
    let q = `insert into users (f_name, l_name, email, phone_no, activation_code) values (?, ?, ?, ?, ?);`;
    let result = await executeQuery(q, [data.f_name, data.l_name, data.email, data.phone_no, code]);
    res.send({code});
})

router.get('/checkMail/:mail/:pass', async(req, res)=> {

    let result = await executeQuery(`select count(*) as ct from users where email = ?;`, [req.params.mail]);

    let ch = await executeQuery(`select pass, salt from users where email = ?;`, [req.params.mail]);
    if(result[0].ct == 1 && req.params.pass.length > 1){
        let pass_check = await executeQuery(`select pass, salt from users where email = ?;`, [req.params.mail])
        let enc_pass = md5(`${req.params.pass}`+`${pass_check[0].salt}`);
        if(enc_pass == pass_check[0].pass) {


            let data = {
                expiresIn: '1d',
                password : pass_check[0].pass,
                email : req.params.mail
            }

            let token = jwt.sign(data,"manil");
            res.cookie("token" ,token, {maxAge: 24 * 60 * 60 * 1000});


            res.send({"check":"valid", "mail":"cantuse"})
        }
        else {
            res.send({"check":"invalid", "mail":"cantuse"})
        }
    }
    else if(result[0].ct != 1) {
        res.send({"check": "invalid", "mail":"canuse"})
    }
    else {
        res.send({"check": "invalid", "mail":"cantuse"})
    }
})

router.get('/activateUser/:code', async(req, res)=> {
    let q = `select created_at from users where activation_code = ?;`;
    let result = await executeQuery(q, [req.params.code]);
    let temp = result[0].created_at.toString().slice(4, 24)
    let old_date = new Date(temp);
    let time_diff = Math.floor((dateObject.getTime()-old_date.getTime())/60000);
    if(time_diff < 1) {
        res.render('password', {code:req.params.code})
    }         
    else {
        await executeQuery(`delete from users where activation_code = ?;`, [req.params.code]);
        res.redirect('/')
    }
})

router.post('/login', async(req, res)=> {
    let data = req.body;
    let salt =  uid.rnd(4);
    let pass_res = data.create+salt;
    let pass_enc = md5(pass_res)
    let q = `update users set pass=?, salt=?, status='1' where activation_code = ?;`
    await executeQuery(q, [pass_enc, salt, data.code]);

    res.redirect('/loginPage')
})

router.get('/loginPage', (req, res)=> {
    res.render('login')
})

router.get('/success',auth, (req, res)=> {
    res.render('link')
})

router.get('/display/:prog',auth, (req, res)=> {
    res.render(req.params.prog)
})


router.get('/js_exec/:prog_name', (req, res)=> {
    switch (req.params.prog_name) {
        case 'saperate_VowCons':
            res.write("You Are In the saperate_VowCons Route\n");
        
            // let str="Manil Shah";
            ans=vovCon.checkVowel(req.query.str);
            res.write(ans.sugg.toString());
            res.write("Vowels In the string are : "+ans.vowelStr.toString()+"\n");
            res.write("Consonents In the string are : "+ans.consonentStr.toString()+"\n");
            res.end()
            
            break;

        case 'saperate_OddEven':
            res.write("You are in the saperate_OddEven Route\n");

            // let arr=[1,2,3,4,5,6,7,8,9,0];
            let intArr = req.query.arr.split(',');
            ans=oddEven.checkOdd(intArr);
            res.write(ans.sugg.toString());
            res.write("Odd Nos. in the array is : "+ans.oddArr.toString()+"\n");
            res.write("Even Nos. in the array is : "+ans.evenArr.toString()+"\n");
            res.end()
            break;
    
        case 'groupBy':
            res.write("You are in the groupBy Route\n");

            let arrOg= [
                {a:'1',b:'2',c:'3'},
                {a:'4',b:'2',c:'5'},
                {a:'6',b:'7',c:'8'}
            ];
            ans=groupBy.group(arrOg);
            res.write("Object After Perfoming Group by is : "+JSON.stringify(ans));
            res.end()
            break;

        case 'factorial':
            res.write("You are in the factorial Route\n");
        
            let que=req.query.n
            if (isNaN(que)) {
                res.write("Entered Argument is not a number\n");
            }
            else {
                // let n=5;
                let ans=fectorial.fect(que);
                res.write("Factorial of "+que+" is "+ans.toString());
            }
            res.end()
            break;

        case 'vovInStr':
            res.write("You are in the Vowel count of every Str Route\n");

            // let str=["Manil", "Shah"];
            let strArr = req.query.arr.split(',');
            ans = vovInStr.count(strArr);
            res.write("Vowel count of every strinf is : "+ans.toString());
            res.end()
            break;

        case 'longestStr_count':
            res.write("You are in the longestStr_count Route\n");

            // let str=["Manil", "Shah"];
            let strArr2 = req.query.arr.split(',');
            ans=longestStr.count(strArr2);
            res.write("Vowel Count of the longest String in the Array is "+ans.toString());
            res.end()
            break;

        case 'palindrom':
            res.write("You are in the palindrome Route\n");

            // let str="abccba";
            ans=palindrom.chk(req.query.str);
            res.write(ans);
            res.end()
            break;

        case 'calc':
            res.write("You are in the clac Route\n");

            let strArr3 = req.query.arr.split(',');

            num1=parseFloat(strArr3[0]);
            num2=parseFloat(strArr3[1]);
            operator=strArr3[2];
            if(operator!='add' && operator!='subtraction' && operator!='multiplication' && operator!='division') {
                res.write('Invalid Operator Name Entered!');
            }
            else {
                ans=calc.calc(num1, num2, operator);
                res.write(num1+" "+operator+" by "+num2+" = "+ans);
            }
            res.end()
            break;

        default:
            res.send(`Entered programe name "${req.params.prog_name}" is invalid!`)
            break;
    }
})

router.get('/execQery/:q', async(req, res)=> {
    let result = await executeQuery(req.params.q);
    res.send({result})
})

module.exports = router