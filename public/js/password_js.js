function sub_pass() {
    if(document.getElementById('create').value.trim() == '' || document.getElementById('create').value.trim() == '' || document.getElementById('create').value != document.getElementById('confirm').value) {
        document.getElementById('err').innerHTML = 'Enter valid pair of passwords';
        return false;
    }
    else {
        document.getElementById('err').innerHTML = ``;
        return true;
    }
}