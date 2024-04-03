// let arr=[]
// if(process.argv.length < 3) {
//     arr=[1,2,3,4,5,6,7,8,9,0];
//     checkOdd(arr);
// }
// else {
//     let ct=process.argv.length;
//     for(let i=2; i<ct; i++) {
//         arr = process.argv[i].split(",");
//         checkOdd(arr);
//         console.log("End of Argument "+(i-1));
//     }
// }

function checkOdd(arr) {
    oddArr=[];
    evenArr=[];
    let sugg = "";
    arr.forEach(element => {
        if(isNaN(element)) {
            sugg += element+" is Not A Number"+"\n";
        }
        else if (element%2==0) {
            evenArr.push(element);
        }
        else {
            oddArr.push(element);
        }
    });

    return {oddArr, evenArr, sugg};
}

module.exports={checkOdd};