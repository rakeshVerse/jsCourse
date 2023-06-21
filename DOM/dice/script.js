"use strict";

// dom selection
const playerOneHoldTxt = document.querySelector("#player-0 .hold");
const playerTwoHoldTxt = document.querySelector("#player-1 .hold");
const playerOneCurrentScore = document.querySelector(
  "#player-0 .current-score"
);
const playerTwoCurrentScore = document.querySelector(
  "#player-1 .current-score"
);
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const diceImg = document.querySelector("img");

let holdScore, currentScore, playing, activePlayer;

// initialize values
const init = () => {
  // initial values
  holdScore = [0, 0];
  currentScore = 0;
  playing = true; // game state
  activePlayer = 0; // by default player-1 is active. 0 for player-1, 1 for player-2

  // assign initial values to dom
  playerOneHoldTxt.textContent = 0;
  playerTwoHoldTxt.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;

  // remove dice
  diceImg.src = "";

  // remove victory class
  document.getElementById(`player-0`).classList.remove("victory");
  document.getElementById(`player-1`).classList.remove("victory");

  // set player-1 as active initially
  document.querySelector("#player-0").classList.add("active-player");
  document.querySelector("#player-1").classList.remove("active-player");
};

init();

// roll btn click event
btnRoll.addEventListener("click", () => {
  if (playing) {
    // roll dice = generate a randowm number between 1-6
    const dice = Math.floor(Math.random() * 6) + 1;
    // console.log(dice);

    // dispaly dice img as per dice number
    diceImg.setAttribute("src", `/images/${dice}.png`);

    //  if dice = 1- switch player else update current score of the active player
    if (dice === 1) {
      switchPlayer();
    } else {
      // update active palyer's current score with dice number
      currentScore += dice;

      // display updated current score of the active player
      document.querySelector(
        `#player-${activePlayer} .current-score`
      ).textContent = currentScore;
    }
  }
});

// hold btn click event
btnHold.addEventListener("click", () => {
  /**
   * update hold variable of active player
   * display updated hold value
   * if hold >= 100 - active player won
   * else - switchPlayer
   */
  if (playing) {
    // update hold score of active player
    holdScore[activePlayer] += currentScore;
    document.querySelector(`#player-${activePlayer} .hold`).textContent =
      holdScore[activePlayer];

    if (holdScore[activePlayer] >= 100) {
      // update game state
      playing = false;
      // if player won - show green color section to indicate victory
      document
        .getElementById(`player-${activePlayer}`)
        .classList.add("victory");
      // remove dice
      diceImg.src = "";
    } else {
      switchPlayer();
    }
  }
});

// switch player
const switchPlayer = () => {
  // set current score to 0
  currentScore = 0;

  // display score
  document.querySelector(`#player-${activePlayer} .current-score`).textContent =
    currentScore;

  // toggle active class to indicate switch player
  document.querySelector("#player-0").classList.toggle("active-player");
  document.querySelector("#player-1").classList.toggle("active-player");

  // switch player
  activePlayer = activePlayer ? 0 : 1;
};

// reset
document.querySelector(".btn-newgame").addEventListener("click", init);
