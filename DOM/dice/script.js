"use strict;";

// initial values
let playerOneHold = 0;
let playerTwoHold = 0;
let playerCurrentScore = 0;

// dom selection
const playerOneSection = document.querySelector(".player-1");
const playerTwoSection = document.querySelector(".player-2");
const playerOneHoldTxt = document.querySelector(".player-1 .hold");
const playerTwoHoldTxt = document.querySelector(".player-2 .hold");
const playerOneCurrentScore = document.querySelector(
  ".player-1 .current-score"
);
const playerTwoCurrentScore = document.querySelector(
  ".player-2 .current-score"
);
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const diceImg = document.querySelector("img");

// assign initial values to dom
playerOneHoldTxt.textContent = playerOneHold;
playerTwoHoldTxt.textContent = playerTwoHold;
playerOneCurrentScore.textContent = playerCurrentScore;
playerTwoCurrentScore.textContent = playerCurrentScore;

// by default player-1 is active. 1 - player-1, 2 - player-2
let activePlayer = 1;

// roll btn click event
btnRoll.addEventListener("click", () => {
  // roll dice = generate a randowm number between 1-6
  let dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  // dispaly dice img as per dice number
  diceImg.setAttribute("src", `/images/${dice}.png`);

  /**
   * if dice number is 1:
   *  - switch player
   * else
   *  - update current score of the active player
   */
  if (dice === 1) {
    switchPlayer(); // switch player
  } else {
    playerCurrentScore += dice; // update active palyer's current score with dice number

    // display updated current score of the active player
    activePlayer === 1
      ? (playerOneCurrentScore.textContent = playerCurrentScore)
      : (playerTwoCurrentScore.textContent = playerCurrentScore);
  }
});

// hold btn click event
btnHold.addEventListener("click", () => {
  /**
   * update hold variable of active player
   * display updated hold value
   * if hold >= 100
   *  - active player won
   * else
   *  - switchPlayer
   */
  updateHoldScore();
  const won = checkWinner();
  if (!won) switchPlayer();
});

// reset
document.querySelector(".btn-newgame").addEventListener("click", () => {
  location.reload();
});

// switch player
const switchPlayer = () => {
  playerCurrentScore = 0; // set current score to 0

  // display current score for the active player & switch state
  if (activePlayer === 1) {
    playerOneCurrentScore.textContent = playerCurrentScore; // display score
    playerOneSection.classList.remove("active-player"); // remove active class from player-1
    playerTwoSection.classList.add("active-player"); // add active class to player-2
    activePlayer = 2; // set player-2 as active player
  } else {
    playerTwoCurrentScore.textContent = playerCurrentScore; // display score
    playerTwoSection.classList.remove("active-player"); // remove active class from player-2
    playerOneSection.classList.add("active-player"); // add active class to player-1
    activePlayer = 1; // set player-1 as active player
  }
};

// update hold score of active player
const updateHoldScore = () => {
  if (activePlayer === 1) {
    playerOneHold += playerCurrentScore;
    playerOneHoldTxt.textContent = playerOneHold;
  } else {
    playerTwoHold += playerCurrentScore;
    playerTwoHoldTxt.textContent = playerTwoHold;
  }
};

// check winner after every hold
const checkWinner = () => {
  /**
   * if player won
   *  - show green color section to indicate victory
   *  - disable roll and hold btn
   * else
   *  - switch player
   */

  let won = false;
  if (activePlayer === 1 && playerOneHold >= 100) {
    playerOneSection.classList.add("victory");
    disableRollAndHoldBtns();
    won = true;
  } else if (activePlayer === 2 && playerTwoHold >= 100) {
    playerTwoSection.classList.add("victory");
    disableRollAndHoldBtns();
    won = true;
  }

  return won;
};

const disableRollAndHoldBtns = () => {
  btnHold.disabled = true;
  btnRoll.disabled = true;
};
