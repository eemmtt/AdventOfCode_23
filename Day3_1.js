
const SumPartNums = (schematic, symbols, numbers) => {
    console.log("---> Start SumPartNums");
    let sum = numbers.reduce(
        (agg, number) => {
            let result = 0;
            let found = false;
            
            //calc indices of rows adjacent to number
            let above = number.y - 1 > 0? number.y - 1: 0;
            let inline = number.y;
            let below = number.y + 1 < schematic.length? number.y + 1: schematic.length - 1;
            
            //flatten symbols in adj rows to single array
            let symbolsCombined = symbols[above].concat(symbols[inline]).concat(symbols[below]);

            //check for a match, stop if found
            symbolsCombined.forEach(symbol => {
                if(symbol >= number.x - 1 && symbol <= number.x + number.width && !found){
                    result = number.value;
                    found = true;
                }
            });
            return agg + result;
        },0);
    return sum;
};

const FindSymbolCoords = (schematic) => {
    console.log("---> Start FindSymbolCoords");
    const SYMBOL_LIST = "*&%$#@/=+-_)(^!";

    //init weird matrix, match rows to schema
    let symbolCoords = [];
    for(let k = 0; k < schematic.length; k+=1){
        symbolCoords.push([]);
    }

    //find symbols, insert to matrix
    for(let i = 0; i < schematic.length; i+=1){
        for(let j = 0; j < schematic[i].length; j+=1){
            if (SYMBOL_LIST.includes(schematic[i][j])){
                symbolCoords[i].push(j);
            }
        }
    }
    return symbolCoords;
};

const FindNumberRects = (schematic) => {
    console.log("---> Start FindNumberRects");
    const IsNum = (n) => {
        const NUMBER_LIST = "1234567890";
        return NUMBER_LIST.includes(n);
    }
    let numberRects = [];
    for(let i = 0; i < schematic.length; i+=1){
        let prevchar = schematic[i][0];
        let head = 0;
        let tail = 0;
        let buildNum = IsNum(prevchar)? prevchar: "";
        //idk why I was thinking 'rectangles'
        for(let j = 1; j < schematic[i].length; j+=1){
            let currchar = schematic[i][j];
            if (!IsNum(prevchar) && IsNum(currchar)){
                head = j;
                buildNum += currchar;
            } else if (IsNum(prevchar) && IsNum(currchar)){
                buildNum += currchar;
                if (j == schematic[i].length - 1){
                    tail = j;
                    numberRects.push({value: Number(buildNum), x: head, y: i, width: tail - head});
                }
            } else if (IsNum(prevchar) && !IsNum(currchar)){
                tail = j;
                numberRects.push({value: Number(buildNum), x: head, y: i, width: tail - head});
                buildNum = '';
            } else {
                 continue;
            }
            prevchar = currchar;
        }
    }
    return numberRects;
};

module.exports = { FindSymbolCoords, FindNumberRects, SumPartNums};