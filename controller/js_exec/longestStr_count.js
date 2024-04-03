// let str=[];
// if(process.argv.length < 3) {
//     str=["Manil", "Shah"];
//     count(str);
// }
// else {
//     let ct=process.argv.length;
//     for(let i=2; i<ct; i++) {
//         str.push(process.argv[i]);
//     }
//     count(str);
// }

function count(str) {
    let max=0;
    let vowels = ["A","E","I","O","U","a","e","i","o","u"];
    for (let i=0; i<str.length; i++) {
        if (str[i].length>max) {
            max=str[i].length;
        }
    }
    let vowelCount=0;
    for (let i=0; i<str.length; i++) {
        if (str[i].length==max) {
            let arr=str[i].split('');
            vowelCount=0;
            for (let j=0; j<arr.length; j++) {
                if(vowels.includes(arr[j])) {
                    vowelCount++;
                }
            }
        }
    }

    return vowelCount;
}

module.exports={count};