// let str=[];
// if(process.argv.length < 3) {
    // str=["Manil", "Shah"];
    // count(str);
// }
// else {
//     let ct=process.argv.length;
//     for(let i=2; i<ct; i++) {
//         str.push(process.argv[i]);
//     }
//     count(str);
// }

function count(str) {
    let vowels = ["A","E","I","O","U","a","e","i","o","u"];
    let ans="{";
    for (let i=0; i<str.length; i++) {
        let arr=str[i].split('');
        let vowelCount=0;
        for (let j=0; j<arr.length; j++) {
            if(vowels.includes(arr[j])) {
                vowelCount++;
            }
        }
        ans+=`'`+str[i]+`':`+vowelCount+`,`;
        // console.log("No. Of Vowels in the String is : "+vowelCount);
    }
    ans+=`}`;
    // console.log(ans);

    return ans;
}

module.exports={count};