const input = require("./Day1_input.js");

const toNumber = (s) => {
    if (s == 'one') return 1;
    if (s == 'two') return 2;
    if (s == 'three') return 3;
    if (s == 'four') return 4;
    if (s == 'five') return 5;
    if (s == 'six') return 6;
    if (s == 'seven') return 7;
    if (s == 'eight') return 8;
    if (s == 'nine') return 9;
    return Number(s);
}
const grams = [
    [],
    ['1','2','3','4','5','6','7','8','9'],
    [],
    ['one', 'two', 'six'],
    ['four','five', 'nine'],
    ['three', 'seven', 'eight']
]

const check = (code, start, l) => {
    let substr = code.substring(start, start+l);
    if (grams[l].includes(substr)){
        return toNumber(substr);
    } else {
        return 0;
    }
}

const scanLRRL = (code) => {
    let lmatch = 0;
    let rmatch = 0;
    
    for (let li = 0; li <= code.length; li += 1) {
        ri = code.length - li;

        if (lmatch == 0){
            for (let len = 5; len >= 1; len -= 1){
                if (code.length - li >= len) {
                    lmatch = check(code, li, len);
                    if (lmatch != 0)break;
                }
            }
        }

        if (rmatch == 0){
            for (let len = 5; len >= 1; len -= 1){
                if (li >= len) {
                    rmatch = check(code, ri, len);
                    if (rmatch != 0) break;
                }
            }
        }
    }
    return [lmatch, rmatch];
}



let result = input.data.reduce(
    (total, element) => {
        let matches = scanLRRL(element);
        let combined = 10 * matches[0] + matches[1];
        return total + combined;
    },0);

console.log("sum of codes: ", result);