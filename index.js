const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');

const router = require('./router/router')
const port = 8016

const app=express();

app.use(express.static("public/"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use(router)

app.all('*', (req, res)=> {
    res.send('Error 404 Page Not Found!');
})

app.listen(port, ()=> {
    console.log('Listening Port : '+port);
})