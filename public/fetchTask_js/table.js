// async function demo() {
//     console.log('First Log');
//     await time().then((result)=>{ console.log(result)})
//     console.log('Second Log');
// }
// function time() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve('Timed Out Successfully');
//         }, 2000);

//     });
// }

// demo();

var ct = 0;

async function func1(start, end) {
    var data = await fetch('https://jsonplaceholder.org/posts')
        .then(response => {return response.json() })
    var qr = ``;
    tbl = document.getElementById('tbl');
    var keys = ['id', 'slug', 'title'];
    qr += `<tr>`;
    for (let i = 0; i < keys.length; i++) {
        qr += `<th>${keys[i]}</th>`
    }
    qr += `<th>View More</th></tr>`;
    var sliced = data.slice(start, end);
    for (let i = 0; i < sliced.length; i++) {
        qr += `<tr>`;
        for (let j = 0; j < keys.length; j++) {
            qr += `<td>${sliced[i][keys[j]]}</td>`;
        }
        qr += `<td><a href="/fetchTask/allData?sid=${sliced[i]['id']}"><button>All Details</button></a></td></tr>`;
    }
    tbl.innerHTML = qr;
}

if (ct == 0) {
    ct += 10;
    func1(0, 10);
}

function clk(arg) {
    if (arg == 'home') {
        ct = 0;
        func1(ct, ct + 10);
    }
    else if (arg == 'prev') {
        if (ct >= 10) {
            ct -= 10;
            func1(ct, ct + 10);
        }
    }
    else if (arg == 'next') {
        if (ct <= 90) {
            func1(ct, ct + 10);
            ct += 10;
        }
    }
    else if (arg == 'end') {
        ct = 90;
        func1(ct, ct + 10);
    }
}