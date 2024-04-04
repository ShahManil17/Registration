const route = require('express').Router();

const vovCon=require('../controller/js_exec/saperate_VowConst');
const oddEven=require('../controller/js_exec/saperate_OddEven');
const groupBy=require('../controller/js_exec/groupBy');
const fectorial=require('../controller/js_exec/fectorial');
const vovInStr=require('../controller/js_exec/vowelInStr');
const longestStr=require('../controller/js_exec/longestStr_count');
const palindrom=require('../controller/js_exec/palindrom');
const calc=require('../controller/js_exec/calc');

const delimeter = require('../controller/delimeter_rout')
const ajaxCity = require('../controller/ajaxCity_rout')
const sortPagging = require('../controller/sortPagging_rout')
const userQuery = require('../controller/userGivenQuery_route')
const resultDatabase = require('../controller/resultDatabase_rout')
const crudUsingAjax = require('../controller/crudUsingAjax_rout')
const attandanceDatabase = require('../controller/attandanceDatabase_rout')
const fetchTask = require('../controller/fetchTask_rout')
const ehya = require('../controller/ehya_rout')
const awanHoster = require('../controller/awanHoster_route')
const hireX = require('../controller/hireX_rout')

const loginRegistration = require('../controller/loginRegistration')

route.use(delimeter)
route.use(ajaxCity)
route.use(sortPagging)
route.use(userQuery)
route.use(resultDatabase)
route.use(crudUsingAjax)
route.use(attandanceDatabase)
route.use(fetchTask)
route.use(ehya)
route.use(awanHoster)
route.use(hireX)
route.use(loginRegistration)

module.exports = route