// let arrOg= [
//     {a:'1',b:'2',c:'3'},
//     {a:'4',b:'2',c:'5'},
//     {a:'6',b:'7',c:'8'}
// ];

function group(arrOg) {
    let vars=arrOg.reduce((acc, curr)=> {
        if(!acc[curr.b]) {
            acc[curr.b]=[]
        }
        acc[curr.b].push({a:curr.a, c:curr.c})
        return acc
    }, {})
    
    return vars;
}


module.exports={group};