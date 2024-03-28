// let n;
// // if(process.argv.length < 3) {
//     n=5;
//     let ans=fect(n);
//     console.log("Fectorial of "+n+" is "+ans);
// }
// else {
//     let ct=process.argv.length;
//     for(let i=2; i<ct; i++) {
//         n=process.argv[i];
//         let ans=fect(n);
//         console.log("Fectorial of "+n+" is "+ans);
//     }
// }

function fect(n) {
    if(n==0) {
        return 1;
    }
    else {
        return n*fect(n-1);
    }
}

module.exports={fect};