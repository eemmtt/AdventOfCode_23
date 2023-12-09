//process input into games of winning and drawn numbers
const input = require("./Day4_input.js");

const CleanInput = (cards) => {
    let formatted = [];
    cards.forEach(card => {
        let [winningNums, drawnNums] = card.split("|");
        winningNums = winningNums.split(":")[1].split(" ").filter(a => a); //filter(a => a) discards empty array items
        drawnNums = drawnNums.trimStart().split(" ").filter(a => a);
        formatted.push({winning: winningNums, drawn: drawnNums, quantity:1});
    });
    return formatted; 
};

const cards = CleanInput(input.d2);
let total = cards.reduce((agg, card, i) => {
    let winningNums = new Set(card.winning);
    let drawnNums = new Set(card.drawn);
    let matches = new Set([...drawnNums].filter(drawnNum => winningNums.has(drawnNum))); //hacky boolean intersection of winningNums and drawnNums
    
    for (let j = 1; j <= matches.size; j++) {
        if (i+j > cards.length) break; //exit if no more cards
        let curr = cards[i+j]; //pick next card
        //let update = card.quantity * matches.size; //calculate new quantity
        cards[i+j] = {...curr, quantity: curr.quantity + card.quantity}; //update quantity
    }

    return agg + card.quantity;
}, 0);


console.log("The total number of cards is:", total);