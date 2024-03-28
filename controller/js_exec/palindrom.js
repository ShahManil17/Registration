// let str="";
// if(process.argv.length < 3) {
    // str="abccba";
    // chk(str);
// }
// else {
//     let ct=process.argv.length;
//     for(let i=2; i<ct; i++) {
//         str+=process.argv[i]
//     }
//     chk(str);
// }

function chk(str) {
    let demo="";
    let len = str.length;
    for (let i=0; i<len/2; i++) {
        if(str[i] != str[len-1-i]) {
            // console.log("String "+str+" Is Not Palindrome!");
            demo="String "+str+" Is Not Palindrome!";
            return demo;
        }
    }
    demo="String "+str+" Is Palindrome!";

    return demo;
}

// console.log(Math.ceil(5/2));

module.exports={chk};