const express = require('express');
const mysql = require('mysql');
const md5 = require('md5');
const bodyParser=require('body-parser');

const vovCon=require('./controller/js_exec/saperate_VowConst');
const oddEven=require('./controller/js_exec/saperate_OddEven');
const groupBy=require('./controller/js_exec/groupBy');
const fectorial=require('./controller/js_exec/fectorial');
const vovInStr=require('./controller/js_exec/vowelInStr');
const longestStr=require('./controller/js_exec/longestStr_count');
const palindrom=require('./controller/js_exec/palindrom');
const calc=require('./controller/js_exec/calc');

const delimeter = require('./controller/delimeter_rout')
const ajaxCity = require('./controller/ajaxCity_rout')
const sortPagging = require('./controller/sortPagging_rout')
const userQuery = require('./controller/userGivenQuery_route')
const resultDatabase = require('./controller/resultDatabase_rout')
const crudUsingAjax = require('./controller/crudUsingAjax_rout')
const attandanceDatabase = require('./controller/attandanceDatabase_rout')

const app=express();
const port=8015;
const ShortUniqueId = require('short-unique-id');


app.use(express.static("public/"));

app.use(bodyParser.urlencoded({extended: false}));

const uid = new ShortUniqueId();

const dateObject = new Date();

app.set('view engine', 'ejs');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'merge_db'
});

const executeQuery = (str) => {
    return new Promise((resolve, reject)=> {
        con.query(str, function(err, result) {
            if(err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}

app.use(delimeter)
app.use(ajaxCity)
app.use(sortPagging)
app.use(userQuery)
app.use(resultDatabase)
app.use(crudUsingAjax)
app.use(attandanceDatabase)

app.get('/', (req, res)=> {
    res.render('register');
})

app.post('/setData', async(req, res)=> {
    let data = req.body;
    let code = uid.rnd(12);
    let q = `insert into users (f_name, l_name, email, phone_no, activation_code) values ('${data.f_name}', '${data.l_name}', '${data.email}', '${data.phone_no}', '${code}');`;
    let result = await executeQuery(q);
    res.send({code});
})

app.get('/checkMail/:mail/:pass', async(req, res)=> {

    let result = await executeQuery(`select count(*) as ct from users where email = '${req.params.mail}';`);

    let ch = await executeQuery(`select pass, salt from users where email = '${req.params.mail}';`);
    if(result[0].ct == 1 && req.params.pass.length > 1){
        let pass_check = await executeQuery(`select pass, salt from users where email = '${req.params.mail}';`)
        let enc_pass = md5(`${req.params.pass}`+`${pass_check[0].salt}`);
        if(enc_pass == pass_check[0].pass) {
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

app.get('/activateUser/:code', async(req, res)=> {
    let q = `select created_at from users where activation_code = '${req.params.code}';`;
    let result = await executeQuery(q);
    var temp = result[0].created_at.toString().slice(4, 24)
    let old_date = new Date(temp);
    let time_diff = Math.floor((dateObject.getTime()-old_date.getTime())/60000);
    if(time_diff < 1) {
        res.render('password', {code:req.params.code})
    }         
    else {
        await executeQuery(`delete from users where activation_code = '${req.params.code}';`);
        res.redirect('/')
    }
    res.end();
})

app.post('/login', async(req, res)=> {
    let data = req.body;
    let salt =  uid.rnd(4);
    let pass_res = data.create+salt;
    let pass_enc = md5(pass_res)
    let q = `update users set pass='${pass_enc}', salt='${salt}', status='1' where activation_code = '${data.code}';`
    await executeQuery(q);

    res.redirect('/loginPage')
    
    res.end();
})

app.get('/loginPage', (req, res)=> {
    res.render('login')
})

app.get('/success', (req, res)=> {
    res.render('link')
})

app.get('/display/:prog', (req, res)=> {
    res.render(req.params.prog)
})


app.get('/js_exec/:prog_name', (req, res)=> {
    console.log(req.params.prog_name);
    switch (req.params.prog_name) {
        case 'saperate_VowCons':
            res.write("You Are In the saperate_VowCons Route\n");
        
            // let str="Manil Shah";
            ans=vovCon.checkVowel(req.query.str);
            res.write(ans.sugg.toString());
            res.write("Vowels In the string are : "+ans.vowelStr.toString()+"\n");
            res.write("Consonents In the string are : "+ans.consonentStr.toString()+"\n");
            
            res.end();
            break;

        case 'saperate_OddEven':
            res.write("You are in the saperate_OddEven Route\n");

            // let arr=[1,2,3,4,5,6,7,8,9,0];
            let intArr = req.query.arr.split(',');
            ans=oddEven.checkOdd(intArr);
            res.write(ans.sugg.toString());
            res.write("Odd Nos. in the array is : "+ans.oddArr.toString()+"\n");
            res.write("Even Nos. in the array is : "+ans.evenArr.toString()+"\n");

            res.end();
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

            res.end();
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

            res.end();
            break;

        case 'vovInStr':
            res.write("You are in the Vowel count of every Str Route\n");

            // let str=["Manil", "Shah"];
            let strArr = req.query.arr.split(',');
            ans = vovInStr.count(strArr);
            res.write("Vowel count of every strinf is : "+ans.toString());

            res.end();
            break;

        case 'longestStr_count':
            res.write("You are in the longestStr_count Route\n");

            // let str=["Manil", "Shah"];
            let strArr2 = req.query.arr.split(',');
            ans=longestStr.count(strArr2);
            res.write("Vowel Count of the longest String in the Array is "+ans.toString());

            res.end();
            break;

        case 'palindrom':
            res.write("You are in the palindrome Route\n");

            // let str="abccba";
            ans=palindrom.chk(req.query.str);
            res.write(ans);

            res.end();
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

            res.end();
            break;

        default:
            res.send(`Entered programe name "${req.params.prog_name}" is invalid!`)
            break;
    }
})

app.get('/execQery/:q', async(req, res)=> {
    let result = await executeQuery(req.params.q);
    res.send({result})
})

app.all('*', (req, res)=> {
    res.send('Error 404 Page Not Found!');
})

app.listen(port, ()=> {
    console.log('Listening Port : '+port);
})