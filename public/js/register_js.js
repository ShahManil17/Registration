async function generate_link() {
    document.getElementById('mailerror').innerHTML = ``;
    document.getElementById('msg').innerHTML = ``;
    if(document.getElementById('phone_no').value.length != 10) {
        document.getElementById('msg').innerHTML = `Please Enter Valid Phone_no`;
    }

    const form = document.getElementById('reg');
    const obj = new URLSearchParams(new FormData(form));
    let mail_check = await fetch(`/checkMail/${document.getElementById('mail').value}/z`)
    mail_check = await mail_check.json();

    if(mail_check.mail == 'cantuse') {
        document.getElementById('mailerror').innerHTML = `<p>mail is already registered</p><br>`
    }
    else {
        let res1 = await fetch("http://localhost:8015/setData",
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body: obj
        })
        let res2 = await res1.json();
        document.getElementById('mailerror').innerHTML = ``;
        document.getElementById('msg').innerHTML = `Thank You For The Registration<br>Please Activate Your Account`;
        document.getElementById('msg').style.color = 'blue';
        document.getElementById('activate').innerHTML = `<br><a href="http://localhost:8015/activateUser/${res2.code}">Activate Now</a>`;
    }
}