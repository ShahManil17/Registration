async function func1(id) {
    var url = `https://jsonplaceholder.org/posts/`+id;
    var data = await fetch(url)
    .then(response =>{return response.json()})
    var disp = document.getElementById('display');
    qr=`<h1 style="text-align: center;">All Details</h2>`;
    var ky = Object.keys(data);
    for(let i=0; i<ky.length; i++) {
        if(ky[i] == 'url') {
            qr+=`<p><b>${ky[i]}</b> : <a href="${data[ky[i]]}">Link</a></p>`;
        }
        else if(ky[i] == 'image') {
            qr+=`<p><span><b>Image </b>: </span><img src="https://dummyimage.com/800x430/5e917f/morbi-dictum.png&text=jsonplaceholder.org" width="380px"/></p>`;
        }
        else if(ky[i] == 'thumbnail') {
            qr+=`<p><span><b>Thumbnail </b>: </span><img src="https://dummyimage.com/200x200/5e917f/morbi-dictum.png&text=jsonplaceholder.org" width="140px"/></p>`;
        }
        else {
            qr+=`<p><b>${ky[i]}</b> : ${data[ky[i]]}</p>`;
        }
    }
    qr+=`<br><br><center><button onclick="comment('${data.id}')" id="comm">Comment</button></center>`;
    disp.innerHTML = qr;
}

async function comment(id) {
    var commData = await fetch('https://jsonplaceholder.org/comments/')
    .then(response =>{return response.json()})

    var commArr = [];
    for(let i=0; i<commData.length; i++) {
        if(id == commData[i]['postId']) {
            commArr.push(commData[i]['comment'])
        }
    } 

    document.getElementById('comm').style.display = 'none';
    var qr = `<h2 style="text-align:center;">Comments</h2>`;

    if(commArr.length == 0) {
        document.getElementById('comment').innerHTML = `<p style="color:red;">No Comments Found on this Id</p>`;
    }
    else {
        for(let i=0; i<commArr.length && i<5; i++) {
            qr+=`<p>${commArr[i]}</p>`;
        }
        if(commArr.length > 5) {
            for(let i=0; i<commArr.length; i++) {
                commArr[i]+=`:`;
            }
            qr+=`<button onclick="allComment('${commData[0]['postId']}', '${commArr}')" id="allComm">All Comment</button>`;
        }
        document.getElementById('comment').innerHTML = qr;
    }
}

function allComment(id, data) {
    document.getElementById('allComm').style.display = 'none';
    data = data.split(':');
    let qr = ``;
    for(let i=0; i<data.length; i++) {
        if(i==0) {
            qr+=`<p>${data[i]}</p>`    
        }
        else {
            qr+=`<p>${data[i].slice(1, data[i].length)}</p>`;
        }
    }
    document.getElementById('comment').innerHTML = qr;
}

func1(sid);