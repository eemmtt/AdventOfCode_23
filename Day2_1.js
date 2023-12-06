/*
Bag contains only 12 red, 13 green, 14 blue
Loop over games, determining which are possible
    if the game is possible, add its ID to the total
find the sum of the ID's of possible games
*/
const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;
const input = require("./Day2_input.js");

const RoundIsPoss = (round) => {
    let r = true;
    let b = true;
    let g = true;
    if ('red' in round){
        r = round.red <= RED_MAX;
    }
    if ('blue' in round){
        b = round.blue <= BLUE_MAX;
    }
    if ('green' in round){
        g = round.green <= GREEN_MAX;
    }
    let combination = Boolean(r & b & g);
    return combination; //round is true if r, b, and g below limit
}

const GameIsPoss = (game) => {
    let pos = true;
    game.rounds.forEach(round => {
        if(!RoundIsPoss(round)) pos = false;
    });
    return pos; //if one of the rounds is impossible, game impossible
}

let result = input.games.reduce(
    (aggregator, game) => {
        if (GameIsPoss(game)){
            return aggregator + game.id;
        } else {
            return aggregator;
        }
    },0);

console.log("Sum of game ID's: ", result);

