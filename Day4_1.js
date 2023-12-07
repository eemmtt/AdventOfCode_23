//process input into games of winning and drawn numbers
const input = require("./Day4_input.js");

const CleanInput = (cards) => {
    let formatted = [];
    cards.forEach(card => {
        let [winningNums, drawnNums] = card.split("|");
        winningNums = winningNums.split(":")[1].split(" ").filter(a => a); //filter(a => a) discards empty array items
        drawnNums = drawnNums.trimStart().split(" ").filter(a => a);
        formatted.push({winning: winningNums, drawn: drawnNums});
    });
    return formatted; 
};

const cards = CleanInput(input.d2);
let total = cards.reduce((agg, card) => {
    let winningNums = new Set(card.winning);
    let drawnNums = new Set(card.drawn);
    let matches = new Set([...drawnNums].filter(drawnNum => winningNums.has(drawnNum))); //hacky boolean intersection of winningNums and drawnNums
    let score = 0;
    if (matches.size > 0) {
        score = Math.pow(2,matches.size - 1);
    }
    return agg + score;
}, 0);


console.log("The total is:", total);