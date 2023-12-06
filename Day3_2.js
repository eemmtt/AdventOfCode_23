
const SumGearRatios = (stars, numbers) => {
    console.log("---> Start SumGearRatios");
    const DeDupeNums = (nums) => {
        //because of my lazy filtering solution, numbers need to have duplicates removed
        let unique = [nums[0]];
        let prev = nums[0];
        for (let i = 1; i < nums.length; i++) {
            if (nums[i].pid != prev.pid){
                unique.push(nums[i]);
            }
            prev = nums[i];
        }
        return unique;
    }

    let sum = stars.reduce(
        (agg, star) => { 
            let found = DeDupeNums(numbers.filter((n) => Math.abs(star.y - n.y) <= 1 && Math.abs(star.x - n.x) <= 1));            
            let result = 0;
            if (found.length == 2){
                addNum = found[0].parentVal * found[1].parentVal;
            }
            return agg + result;
        },0);
    return sum;
};

const FindStarCoords = (schematic) => {
    console.log("---> Start FindStarCoords");
    let starCoords = [];
    for(let i = 0; i < schematic.length; i+=1){
        for(let j = 0; j < schematic[i].length; j+=1){
            if (schematic[i][j] == "*"){
                starCoords.push({x: j, y: i});
            }
        }
    }
    return starCoords;
};


const FindNumbCoords = (schematic) => {
    console.log("---> Start FindNumbCoords");
    const IsNum = (n) => {
        const NUMBER_LIST = "1234567890";
        return NUMBER_LIST.includes(n);
    }
    
    let numbers = [];
    let parentID = 0;

    const TempsToNumbers = (temps) => {
        let combo = temps.reduce((agg, temp, i) => {
                let v = temp.value * Math.pow(10, temps.length - (i+1));
                return agg + v;
        }, 0);
        temps.forEach(temp => {
            numbers.push({pid: parentID, parentVal: combo, x: temp.x, y: temp.y});
        });
        parentID += 1;
    }

    for(let i = 0; i < schematic.length; i+=1){ //loop over rows
        let prev = schematic[i][0];
        let reading = false;
        let temps = [];
        if (IsNum(prev)){ // is first char a num?
            temps.push({value: Number(prev), x: 0, y: i});
            reading = true;
        }
        for(let j = 1; j < schematic[i].length; j+=1){ //loop over columns
            let curr = schematic[i][j];
            if (!IsNum(prev) && IsNum(curr)){ // .n
                reading = true;
                temps.push({value: Number(curr), x: j, y: i});
            } else if (IsNum(prev) && IsNum(curr)){ // nn
                temps.push({value: Number(curr), x: j, y: i});
            } else if (IsNum(prev) && !IsNum(curr)){ // n.
                TempsToNumbers(temps);
                reading = false;
                temps = [];
            } else {
                reading = false;
            }
            if (j == schematic[i].length - 1){ // catch n at end of row
                TempsToNumbers(temps);
                temps = [];
            }
            prev = curr;
        }
    }
    console.log(numbers);
    return numbers;
};

module.exports = { FindStarCoords, FindNumbCoords, SumGearRatios };