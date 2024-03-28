async function clk() {
    document.getElementById('msg').innerHTML = ``;
    if(document.getElementById('email').value.trim() == '') {
        document.getElementById('msg').innerHTML = `Please Enter your mail`;
        document.getElementById('email').focus();
    }
    else if(document.getElementById('pass').value.trim() == '') {
        document.getElementById('msg').innerHTML = `Please Enter your password`;
        document.getElementById('pass').focus();
    }
    else {
        let url = `/checkMail/${document.getElementById('email').value}/${document.getElementById('pass').value}`;
        let flag = await fetch(url);
        flag = await flag.json();
        if(flag.check == 'valid') {
            window.location.href = window.location.origin+'/success';
        }    
        else {
            document.getElementById('msg').innerHTML = `Invalid Username or Passworrd`;
        }
    }
}