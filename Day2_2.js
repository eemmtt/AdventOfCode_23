/*
Bag contains only 12 red, 13 green, 14 blue
Loop over games, determining which are possible
    if the game is possible, add its ID to the total
find the sum of the ID's of possible games
*/
const input = require("./Day2_input.js");

const RoundMin = (round) => {
    let r = 0;
    let b = 0;
    let g = 0;
    if ('red' in round){
        r = round.red;
    }
    if ('blue' in round){
        b = round.blue;
    }
    if ('green' in round){
        g = round.green;
    }
    return {red: r, blue: b, green: g};
}

const GamePower = (game) => {
    let max = {red: 0, blue: 0, green: 0};
    game.rounds.forEach(round => {
        let min = RoundMin(round);
        if (min.red > max.red) max.red = min.red;
        if (min.blue > max.blue) max.blue = min.blue;
        if (min.green > max.green) max.green = min.green;
    });
    return max.red * max.blue * max.green;
}

let result = input.games.reduce(
    (aggregator, game) => {
        return aggregator + GamePower(game);
    },0);

console.log("Sum of game Powers: ", result);

