const router = require('express').Router();
const { auth } = require('./midelwer/auth');
const con = require('../database/connection');

router.get('/crudUsingAjax', auth, (req, res)=> {
    res.render('../views/crudUsingAjax_view/home');
})

router.get('/crudUsingAjax/:bid', auth, (req, res)=> {
    res.render('../views/crudUsingAjax_view/home');
})

router.post('/crudUsingAjax/setData', async(req, res)=> {
    let data = req.body;
    let ky = Object.keys(data);
    if(data.id == '') {
        let q_basic = `insert into basic_details (first_name, last_name, designation, email, phone_no, address, city, zip, state, gender, relationship, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        let basic_arr = [];
        let add = ``;
        for(let i=1; i<=13; i++) {
            if(i==6) {
                add+=data[ky[i]];
            }
            else if(i==7) {
                add+=data[ky[i]];
                basic_arr.push(add);
            }
            else if(i==5) {
                basic_arr.push(`${data[ky[i]]}`);
            }
            else {
                basic_arr.push(data[ky[i]]);
            }
        }

        const executequery = (str, arr) =>{
            return new Promise((resolve, reject)=> {
                con.query(str, arr, function(err, result) {
                    if(err) reject(err);
                    else{
                    resolve(result);
                    }
                })
            })
        }
        let basicId;

        try {
            let result_basic = await executequery(q_basic, basic_arr);
            basicId = result_basic.insertId;
        } catch (error) {
            res.send('Error occured inserting basic details')
        }

        var arr = [req.body.board_name, req.body.pass_year, req.body.percentage]
        
        for(let i=0; i<arr[0].length; i++) {
            let q_edu=`insert into edu_details(b_id, board_name, passing_year, percentage) values (?, `;
            let ins_arr = [basicId];
            for(let j=0; j<arr.length; j++) {
                q_edu+=`?,`;
                ins_arr.push(arr[j][i]);
            }
            q_edu = q_edu.slice(0, q_edu.length-1);
            q_edu+=`);`
            try {
                await executequery(q_edu, ins_arr);
            } catch (error) {
                res.send('Error occured inserting eduction details')
            }
        }

        for(let i=0; i<3; i++) {
            if(req.body.comp_name[i]) {
                let q_exp = `insert into work_exp(id, company_name, designation, exp_from, exp_to) values (?, ?, ?, ?, ?)`;
                let exp_arr = [basicId, req.body.comp_name[i], req.body.comp_des[i], req.body.from[i], req.body.to[i]];
                try {
                    await executequery(q_exp, exp_arr);
                } catch (error) {
                    res.send('Error occured inserting work experience')                    
                }
            }
        }
        let q_tech = `insert into tech (id, technology, lvl) values (?, ?, ?)`;

        for(var i=0; i<data.knowledge.length; i++) {
            let a = data.knowledge[i];
            let tech_arr = [basicId ,data.knowledge[i], data[a]];

            try {
                await executequery(q_tech, tech_arr);
            } catch (error) {
                res.send('Error occured inserting technical details')
            }
        }

        if(data.lang.length && typeof(data.lang) != 'string') {
            let q_lang = `insert into lang(id, lang_name, lang_lvl) values (?, ?, ?)`;
            for(let i=0; i<data.lang.length; i++) {
                let a = `${data.lang[i]}_expert`;
                let lang_arr = [];
                lang_arr.push(basicId);
                lang_arr.push(data.lang[i]);
                lang_arr.push(data[a].toString());

                try {
                    await executequery(q_lang, lang_arr);
                } catch (error) {
                    res.send('Error occured inserting lnaguage details')
                }
            }
        }
        else if(data.lang.length) {
            let a = `${data.lang}_expert`;
            let q_lang = `insert into lang(id, lang_name, lang_lvl) values (?, ?, ?)`;

            try {
                await executequery(q_lang, [basicId, data.lang, data[a].toString()]);
            } catch (error) {
                res.send('Error occured inserting language details')
            }
        }

        for(let i=0; i<2; i++) {
            if(req.body.ref_name[i]) {
                let q_exp = `insert into ref(id, name, phone_no, relation) values (?, ?, ?, ?)`;
                let exp_arr = [basicId, req.body.ref_name[i], req.body.ref_no[i], req.body.ref_relation[i]];
                try {
                    await executequery(q_exp, exp_arr);
                } catch (error) {
                    res.send('Error occured inserting references details')
                }
            }
        }

        let prefloc = ``;
        if(typeof(req.body.pref) != 'string') {
            for(let i=0; i<req.body.pref.length; i++) {
                prefloc+=req.body.pref[i]+','
            }
            prefloc = prefloc.slice(0, prefloc.length-1)
        }
        else {
            prefloc = req.body.pref;
        }

        try {
            con.query('insert into preference(id, location, notice, expected_ctc, current_ctc, department) values (?, ?, ?, ?, ?, ?)',[basicId, prefloc, req.body.notice, req.body.exp_ctc, req.body.cur_ctc, req.body.department]);
        } catch (error) {
            res.send('Error occured inserting preferences details')
        }
    }

    //Update Logic

    else {
        const executequery = (str, arr) =>{
            return new Promise((resolve, reject)=> {
                con.query(str, arr, function(err, result) {
                    if(err) reject(err);
                    else{
                    resolve(result);
                    }
                })
            })
        }
        let address = data.add1 + data.add2;
        let up_basic = `update basic_details set first_name=?, last_name=?, designation=?, email=?, phone_no=?, address=?, city=?, zip=?, state=?, gender=?, relationship=?, dob=? where id = ?;`;
        try {
            await executequery(up_basic, [data.f_name, data.l_name, data.designation, data.mail, data.phone_no, address, data.city, data.zip, data.state, data.gender, data.status, data.dob, data.id]);
        } catch (error) {
            console.log('cant update basic details');
        }

        let edu_result = await executequery(`select edu_id from edu_details where b_id = ?`, [data.id]);
        for(let i=0; i<edu_result.length; i++) {
            let up_edu = `update edu_details set board_name = ?, passing_year = ?, percentage = ? where edu_id = ?;`;
            try {
                await executequery(up_edu, [data.board_name[i], data.pass_year[i], data.percentage[i], edu_result[i].edu_id]);
            } catch (error) {
                console.log('cant update educational details');
            }
        }

        let exp_result = await executequery(`select exp_id from work_exp where id=?;`, [data.id]);
        for(let i=0; i<exp_result.length; i++) {
            let up_exp = `update work_exp set company_name = ?, designation = ?, exp_from = ?, exp_to = ? where exp_id = ?;`;
            try {
                await executequery(up_exp, [data.comp_name[i], data.comp_des[i], data.from[i], data.to[i], exp_result[i].exp_id]);
            } catch (error) {
                console.log('cant update experience details');
            }
        }

        let lang_result = await executequery(`select lang_id from lang where id = ?;`, [data.id])
        for(let i=0; i<lang_result.length; i++) {
            let resu = await executequery(`delete from lang where lang_id = ?;`, [lang_result[i].lang_id])
        }
        if(data.lang != undefined) {
            if(data.lang.length > 1 && typeof(data.lang) != 'string') {
                for(let i=0; i<data.lang.length; i++) {
                    let a = `${data.lang[i]}_expert`;
                    let q_lang = `insert into lang (id, lang_name, lang_lvl) values (?, ?, ?);`;
                    try {
                        await executequery(q_lang, [data.id, data.lang[i], data[a].toString()]);
                    } catch (error) {
                        console.log('cant update language details');
                    }
                }
            }

            else if(data.lang.length == 1) {
                let a = `${data.lang}_expert`;
                let q_lang = `insert into lang (id, lang_name, lang_lvl) values (?, ?, ?)`;
                try {
                    await executequery(q_lang, [data.id, data.lang, data[a].toString()]);
                } catch (error) {
                    console.log('cant update language details');
                }
            }
        }

        let tech_result = await executequery(`select tech_id from tech where id = ?;`, [data.id])
        for(let i=0; i<lang_result.length; i++) {
            let resu = await executequery(`delete from lang where lang_id = ?;`, [lang_result[i].lang_id])
        }

        
        for(var i=0; i<data.knowledge.length; i++) {
            let a = data.knowledge[i];
            let q_tech = `insert into tech (id, technology, lvl) values (?, ?, ?)`;
            try {
                await executequery(q_tech, [data.id, data.knowledge[i], data[a]]);
            } catch (error) {
                console.log('cant update technical details');
            }
        }

        for(let i=0; i<data.ref_name.length; i++) {
            if(data.ref_name[i]) {
                let up_ref = `update ref set name = ?, phone_no = ?, relation = ? where id = ?`;
                try {
                    await executequery(up_ref, [data.ref_name[i], data.ref_no[i], data.ref_relation[i], data.id]);
                } catch (error) {
                    console.log('cant update reference details');
                }
            }
        }

        let prefloc = ``;
        if(typeof(req.body.pref) != 'string') {
            for(let i=0; i<req.body.pref.length; i++) {
                prefloc+=req.body.pref[i]+','
            }
            prefloc = prefloc.slice(0, prefloc.length-1)
        }
        else {
            prefloc = req.body.pref;
        }
        let up_pref = `update preference set location = ?, notice = ?, expected_ctc = ?, current_ctc = ?, department = ? where id = ?`

        try {
            await executequery(up_pref, [prefloc, data.notice, data.exp_ctc, data.cur_ctc, data.department, data.id]);
        } catch (error) {
            console.log('cant update preference details');
        }
    }
    res.end();
})

router.get('/getData/:id', async(req, res)=> {
    const executequery = (str, arr) =>{
        return new Promise((resolve, reject)=> {
            con.query(str,arr, function(err, result) {
                if(err) reject(err);
                else{
                resolve(result);
                }
            })
        })
    }
    let count = await executequery(`select count(*) as ct from basic_details where id=?;`, [req.params.id]);
    if(count[0].ct >= 1) {

        let obj = {
            basic_info : await executequery(`select * from basic_details where id=?;`, [req.params.id]),
            edu_info : await executequery(`select * from edu_details where b_id=?;`, [req.params.id]),
            work_info : await executequery(`select * from work_exp where id=?;`, [req.params.id]),
            lang_info : await executequery(`select * from lang where id=?;`, [req.params.id]),
            tech_info : await executequery(`select * from tech where id=?;`, [req.params.id]),
            ref_info :await executequery(`select * from ref where id=?;`, [req.params.id]),
            pref_info : await executequery(`select * from preference where id=?;`, [req.params.id])
        }
        res.json(obj)
    }
    else {
        res.end();
    }
})

module.exports = router