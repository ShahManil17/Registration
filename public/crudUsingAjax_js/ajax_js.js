let ct = 0;
let basic = document.getElementById('basic');
let edu = document.getElementById('education');
let exp = document.getElementById('exp');
let tech_lang = document.getElementById('tech_lang');
let ref = document.getElementById('reference')
let pref = document.getElementById('prefrence');

let arr = [basic, edu, exp, tech_lang, ref, pref];

if(ct == 0) {
    arr.forEach(function(element, index) {
        if(index == 0) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
    document.getElementById('prev').disabled = true;
}

function basic_validation() {
    
    var blank = ['f_name', 'l_name', 'designation', 'mail', 'phone_no', 'add1', 'city', 'zip', 'state', 'dob'];
    for(let i=0; i<blank.length; i++) {
        if(document.getElementById(blank[i]).value=="") {
            document.getElementById('msg').innerHTML=blank[i]+' Can Not Be Blank\n';
            document.getElementById(blank[i]).focus();
            return false;
        }
    }

    var simpNo = ['zip'];
    for(let i=0; i<simpNo.length; i++) {
        if(isNaN(document.getElementById(simpNo[i]).value)) {
            document.getElementById('msg').innerHTML='Entered Number is Invalid at '+simpNo[i]+'\n';
            document.getElementById(simpNo[i]).focus();
            return false;  
        }
    }

    var num = ['phone_no'];
    for(let i=0; i<num.length; i++) {
        if(document.getElementById(num[i]).value.trim()!='') {
            if(document.getElementById(num[i]).value.length!=10 || isNaN(document.getElementById(num[i]).value)) {
                document.getElementById('msg').innerHTML='Entered Number is Invalid at '+num[i]+'\n';
                document.getElementById(num[i]).focus();
                return false;
            }
        }
    }

    var notNum = ['f_name', 'l_name', 'designation', 'mail', 'city', 'state'];
    for(let i=0; i<notNum.length; i++) {
        var val = document.getElementById(notNum[i]).value;
        for(let j=0; j<val.length; j++) {
            if(val[j]!=' ' && !isNaN(val[j])) {
                document.getElementById('msg').innerHTML='Invalid Input at '+notNum[i]+'\n';
                document.getElementById(notNum[i]).focus()
                return false;
            }
        }                
    }

    var mail = ['mail'];
    for(let i=0; i<mail.length; i++) {
        var val = document.getElementById(mail[i]).value;
        if(!val.includes('@') || !val.includes('.')) {
            document.getElementById('msg').innerHTML='Invalid Mail-id\n';
            document.getElementById(mail[i]).focus()
            return false;
        }
    }

    var chk = ['gender'];
    let arr = document.getElementsByName('gender');
    for(let i=0; i<chk.length; i++) {
        let flag = false;
        for(let j=0; j<arr.length; j++) {
            if(arr[j].checked == true) {
                flag = true;
            }
        }
        
        if(flag == false) {
            document.getElementById('msg').innerHTML='Select Gender\n';
            return false;
        }
    }

    var date = ['dob'];
    for(let i=0; i<date.length; i++) {
        var val = document.getElementById(date[i]).value;
        if(val.length != 10) {
            document.getElementById('msg').innerHTML='Invalid Date at '+date[i]+'\n';
            document.getElementById(date[i]).focus()
            return false;
        }
        for(let j=0; j<val.length; j++) {
            if((j==4 && val[j]!='-' && val[j]!='/') || (j==7 && val[j]!='-' && val[j]!='/')) {
                document.getElementById('msg').innerHTML='Invalid Date at '+date[i]+'\n';
                document.getElementById(date[i]).focus()
                return false;
            }
            else if(j!=4 && j!=7 && isNaN(val[j])) {
                document.getElementById('msg').innerHTML='Invalid Date at '+date[i]+'\n';
                document.getElementById(date[i]).focus()
                return false;
            }
        }
    }

    var dropdown = ['status'];
    for(let i=0; i<dropdown.length; i++) {
        if(document.getElementById(dropdown[i]).value == 'default') {
            document.getElementById('msg').innerHTML='Invalid Input at '+dropdown[i]+'\n';
            document.getElementById(dropdown[i]).focus();
            return false;
        }
    }

    return true;
}

function validate_education() {

    var blank = ['board_name', 'pass_year', 'percentage', 'hsc_board', 'hsc_year', 'hsc_percentage', 'bachelor_board', 'bachelor_year', 'bachelor_percentage', 'master_name', 'master_year', 'master_percentage'];
    for(let i=0; i<blank.length; i++) {
        if(document.getElementById(blank[i]).value=="") {
            document.getElementById('msg').innerHTML=blank[i]+' Can Not Be Blank\n';
            document.getElementById(blank[i]).focus();
            return false;
        }
    }

    var notNum = ['board_name', 'bachelor_board', 'master_name'];
    for(let i=0; i<notNum.length; i++) {
        var val = document.getElementById(notNum[i]).value;
        for(let j=0; j<val.length; j++) {
            if(val[j]!=' ' && !isNaN(val[j])) {
                document.getElementById('msg').innerHTML='Invalid Input at '+notNum[i]+'\n';
                document.getElementById(notNum[i]).focus()
                return false;
            }
        }                
    }

    var year = ['pass_year', 'hsc_year', 'bachelor_year', 'master_year'];
    for(let i=0; i<year.length; i++) {
        var val = document.getElementById(year[i]).value;
        if(val.length != 4 || isNaN(val)) {
            document.getElementById('msg').innerHTML='Invalid Year'+year[i]+'\n';
            document.getElementById(year[i]).focus()
            return false;
        }
    }

    var per = ['percentage', 'hsc_percentage', 'bachelor_percentage', 'master_percentage'];
    for(let i=0; i<per.length; i++) {
        if(document.getElementById(per[i]).value > 100 || isNaN(document.getElementById(per[i]).value)) {
            document.getElementById('msg').innerHTML='Invalid Percentage Entered at '+per   [i]+'\n';
            document.getElementById(per[i]).focus();
            return false;
        }
    }

    return true;
}

function validate_exp() {

    var notNum = ['comp_name1', 'comp_des1', 'comp_name2', 'comp_des2', 'comp_name3', 'comp_des3'];
    for(let i=0; i<notNum.length; i++) {
        var val = document.getElementById(notNum[i]).value;
        for(let j=0; j<val.length; j++) {
            if(val[j]!=' ' && !isNaN(val[j])) {
                document.getElementById('msg').innerHTML='Invalid Input at '+notNum[i]+'\n';
                document.getElementById(notNum[i]).focus()
                return false;
            }
        }                
    }

    var exp = [['comp_name1', 'comp_des1', 'from1', 'to1'],['comp_name2', 'comp_des2', 'from2', 'to2'], ['comp_name3', 'comp_des3', 'from3', 'to3']];
    var temp = -1;
    for(let i=0; i<exp.length; i++) {
        for(let j=0; j<exp[i].length; j++) {
            if(document.getElementById(exp[i][j]).value.trim()!='') {
                temp = i;
                break;
            }
        }
    }
    if(temp!=-1) {
        for(let i=0; i<exp[temp].length; i++) {
            if(i==0 || i==1) {
                if(document.getElementById(exp[temp][i]).value.trim()=='' || !isNaN(document.getElementById(exp[temp][i]).value)) {
                    document.getElementById('msg').innerHTML='Invalid Input at '+exp[temp][i]+'\n';
                    document.getElementById(exp[temp][i]).focus();
                    return false;
                }
            }
            else {
                val = document.getElementById(exp[temp][i]).value
                if(val.length != 10) {
                    document.getElementById('msg').innerHTML='Invalid Date at '+date[i]+'\n';
                    document.getElementById(exp[temp][i]).focus()
                    return false;
                }
                for(let j=0; j<val.length; j++) {
                    if((j==4 && val[j]!='-' && val[j]!='/') || (j==7 && val[j]!='-' && val[j]!='/')) {
                        document.getElementById('msg').innerHTML='Invalid Date at '+exp[temp][i]+'\n';
                        document.getElementById(exp[temp][i]).focus()
                        return false;
                    }
                    else if(j!=4 && j!=7 && isNaN(val[j])) {
                        document.getElementById('msg').innerHTML='Invalid Date at '+exp[temp][i]+'\n';
                        document.getElementById(exp[temp][i]).focus()
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function validate_techEdu() {

    var lang = ['hindi', 'english', 'gujarati'];
    for(let i=0; i<lang.length; i++) {
        var lang_lbl = document.querySelector(`input[id='`+lang[i]+`']:checked`);
        var lang_val1 = document.querySelector(`input[id='`+lang[i]+`_read']:checked`);
        var lang_val2 = document.querySelector(`input[id='`+lang[i]+`_write']:checked`);
        var lang_val3 = document.querySelector(`input[id='`+lang[i]+`_speak']:checked`);
        
        for(let j=0; j<3; j++) {
            if((lang_lbl!=null && (lang_val1==null && lang_val2==null && lang_val3==null)) || (lang_lbl==null && (lang_val1!=null || lang_val2!=null || lang_val3!=null))) {
                document.getElementById('msg').innerHTML='Invalid Input at '+lang[i]+'\n';
                return false;
            }             
        }
    }   

    var tech = ['php', 'mysql', 'laravel', 'oracle'];
    for(let i=0; i<tech.length; i++) {
        var tech_radio = document.querySelector(`input[name='`+tech[i]+`']:checked`);
        var tech_chk = document.querySelector(`input[id='`+tech[i]+`_lbl']:checked`);
        if((tech_radio && !tech_chk) || (!tech_radio && tech_chk)) {
            document.getElementById('msg').innerHTML='Invalid Input at '+tech[i]+'\n';
            return false;
        }
    }
    return true;
}

function prev() {
    document.getElementById('next').disabled = false;
    ct--;  
    if(ct >= 0) {
        arr.forEach(function(element, index) {
            if(ct == index) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        });
    }
    if(ct == 0) {
        document.getElementById('prev').disabled = true;
    }
    if(ct == 4) {
        document.getElementById('next').innerHTML = `<input type="button" value="Next" onclick="return next()">`
    }
}

async function ajax_fetch(id) {

    if(ct <= 5) {
        const form = document.getElementById(id);
        const obj = new URLSearchParams(new FormData(form));
        let str = window.location.origin+``;
        let res1 = await fetch("/crudUsingAjax/setData",
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body: obj
        })
        ct++;
    }
    else {
        document.getElementById('next').disabled = true;
    }

}

async function next() {
    document.getElementById('msg').innerHTML = ``;
    switch (ct) {
        case 0:
            if(!basic_validation()) {
                return false;
            }
            break;
        
        case 1:
            if(!validate_education()) {
                return false;
            }
            break;

        case 2:
        if(!validate_exp()) {
            return false;
        }
        break;

        case 3:
        if(!validate_techEdu()) {
            return false;
        }
        break;

        case 4:
        if(!validate_techEdu()) {
            return false;
        }
        break;
    
        default:
            break;
    }
    ct++;
    document.getElementById('prev').disabled = false;
    if(ct < 6) {
        arr.forEach(function(element, index) {
            if(ct == index) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        });
    }
    if(ct == 5) {
        document.getElementById('next').innerHTML = `<input type="button" value="SUBMIT" onclick="ajax_fetch('form')">`
    }

    return true;
}

async function get_data(id) {
    let response = await fetch(`/getData/${id}`);
    let data = await response.json();
    let arr = document.querySelectorAll('input[type=text]');
    document.getElementById('b_id').value = id;
    arr[0].value = data.basic_info[0].first_name;
    arr[1].value = data.basic_info[0].last_name;
    arr[2].value = data.basic_info[0].designation;
    arr[3].value = data.basic_info[0].email;
    arr[4].value = data.basic_info[0].phone_no;
    arr[5].value = data.basic_info[0].address.slice(0, 14);
    arr[6].value = data.basic_info[0].address.slice(15, data.basic_info[0].address.length);
    arr[7].value = data.basic_info[0].city;
    arr[8].value = data.basic_info[0].zip;
    arr[9].value = data.basic_info[0].state;
    arr[10].value = data.basic_info[0].dob.slice(0, 10);
    arr[11].value = data.edu_info[0].board_name;
    arr[12].value = data.edu_info[0].passing_year;
    arr[13].value = data.edu_info[0].percentage;
    arr[14].value = data.edu_info[1].board_name;
    arr[15].value = data.edu_info[1].passing_year;
    arr[16].value = data.edu_info[1].percentage;
    arr[17].value = data.edu_info[2].board_name;
    arr[18].value = data.edu_info[2].passing_year;
    arr[19].value = data.edu_info[2].percentage;
    arr[20].value = data.edu_info[3].board_name;
    arr[21].value = data.edu_info[3].passing_year;
    arr[22].value = data.edu_info[3].percentage;
    arr[41].value = data.pref_info[0].notice;
    arr[42].value = data.pref_info[0].expected_ctc;
    arr[43].value = data.pref_info[0].current_ctc;

    
    
    if(data.basic_info[0].gender == 'm') {
        document.getElementById('male').checked = true;
    } 
    else {
        document.getElementById('female').checked = true;
    }
    
    if(data.basic_info[0].relationship == 'unmarried') {
        document.getElementById('status').value = 'unmarried';
    }
    else if(data.basic_info[0].relationship == 'married') {
        document.getElementById('status').value = 'married';
    }
    let i = 23;
    let ky = Object.keys(data.work_info[0]);
    data.work_info.forEach(element => {
        arr[i].value = element.company_name;
        i++;
        arr[i].value = element.designation;
        i++;
        arr[i].value = element.exp_from.slice(0, 10);
        i++;
        arr[i].value = element.exp_to.slice(0, 10);
        i++;
    });

    data.lang_info.forEach(element => {
        document.getElementById(`${element.lang_name}`).checked = true;
        if(element.lang_lvl.includes('read')) {
            document.getElementById(`${element.lang_name}`+'_read').checked = true;
        }
        if(element.lang_lvl.includes('write')) {
            document.getElementById(`${element.lang_name}`+'_write').checked = true;
        }
        if(element.lang_lvl.includes('speak')) {
            document.getElementById(`${element.lang_name}`+'_speak').checked = true;
        }
    });

    data.tech_info.forEach(element => {
        document.getElementById(`${element.technology}`+'_lbl').checked = true;
        document.getElementById(`${element.technology}`+'_'+`${element.lvl}`).checked = true;
    });
    
    i=35;

    data.ref_info.forEach(element => {
        arr[i].value = element.name
        i++;
        arr[i].value = element.phone_no
        i++;
        arr[i].value = element.relation
        i++;
    });

    let loc_arr = data.pref_info[0].location.split(',');
    let nodes = document.getElementById('pref_location').childNodes;
    nodes.forEach(element => {
        loc_arr.forEach(ele => {
            if(element.value == ele) {
                element.selected = true;
            }
        });
    });

    document.getElementById('department').value = data.pref_info[0].department;   
}

let id = window.location.href.split('/')
if(id[3] != '') {
    get_data(id[3]);
}

function focusev(id) {
    document.getElementById(id).style.backgroundColor="#fef9e7";
}
function blurev(id) {
    document.getElementById(id).style.backgroundColor="white";
}