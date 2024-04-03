// let str="";
// // if(process.argv.length < 3) {
//     str="Manil Shah";
//     checkVowel(str);
// }
// else {
//     let ct=process.argv.length;
//     for(let i=2; i<ct; i++) {
//         str+=" "+process.argv[i]
//     }
//     checkVowel(str);
// }

function checkVowel(str) {
    let arr=str.split('');
    let vowels = ["A","E","I","O","U","a","e","i","o","u"];
    let vowelStr=[];
    let consonentStr=[];
    let sugg="";
    arr.forEach(element => {
        if((element.charCodeAt(0)>=97 && element.charCodeAt(0)<=122) || (element.charCodeAt(0)>=65 && element.charCodeAt(0)<=90)) {
            if(vowels.includes(element)) {
                vowelStr.push(element);
            }
            else {
                consonentStr.push(element);
            }
        }
        else {
            sugg += element+" is Not the Character\n";
        }
    });

    return {vowelStr, consonentStr, sugg};
}

module.exports={checkVowel};