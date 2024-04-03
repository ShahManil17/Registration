// let num1;
// let num2;
// let operator;
// if(process.argv.length < 5) {
    // num1=parseFloat(10);
    // num2=parseFloat(5);
    // operator='add';
    // console.log(typeof(operator));
    // calc(num1, num2, operator);
// }
// else {
//     if(process.argv.length == 5) {
//         num1=parseFloat(process.argv[2]);
//         num2=parseFloat(process.argv[3]);
//         operator=process.argv[4];
//         calc(num1, num2, operator);
//     }
//     else {
//         console.log("Not Valid Length Of Inputs");
//     }
// }

function calc(num1, num2, operator) {
    let ans;
    switch(operator) {
        case 'add':
            ans=num1+num2;
            break;
        case 'subtraction':
            ans=num1-num2;
            break;
        case 'multiplication':
            ans=num1*num2;
            break;
        case 'division':
            ans=num1/num2;
            break;
        default:
            // console.log("Entered Operator is not valid");
    }

    return ans;
}

module.exports={calc};