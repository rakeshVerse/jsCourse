/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
for (const [goal, player] of game.scored.entries()) {
  // console.log(`Goal ${goal + 1}: ${player}`);
}

// 2
const oddsVal = Object.values(game.odds);
let avg = 0;
for (const val of oddsVal) {
  avg += val;
}
avg /= oddsVal.length;
// console.log(`Odd average: ${avg}`);

// 3
const oddsKeyVal = Object.entries(game.odds);

for (const [team, odd] of oddsKeyVal) {
  const teamStr = team === "x" ? `draw` : `victory ${game[team]}`;
  // console.log(`Odd of ${teamStr}: ${odd}`);
}

/**
 * Bonus Challenge
 * scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"]
 */
/**
 *  brute force approach:
 *  - loop throgh scored
 *  - for each item of scored check entire scored array
 *    - if player exist then increase the score
 */
const scorers = {};
for (const player of game.scored) {
  let plScore = 0;
  for (const score of game.scored) if (player === score) plScore++;

  if (plScore) scorers[player] = plScore; // add properties to obj
}
console.log(scorers);

/**
 * Optimized
 * Loop over scored array
 *  if property exists in object, increase the score
 *  else add property and set score to 1
 */
const scorers1 = {};
for (const player of game.scored) {
  scorers1[player] ? scorers1[player]++ : (scorers1[player] = 1);
}

console.log(scorers1);
