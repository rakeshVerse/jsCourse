// generate random number
const number = Math.floor(Math.random() * 20 + 1);
console.log(`-----random number: ${number} ---------`);

const numberRes = document.querySelector("#num-success");
const textRes = document.querySelector("h3"); // result text
const scoreHtml = document.querySelector("#attempt"); // score text
const highScoreHtml = document.querySelector("#hscore"); // score text
const body = document.querySelector("body"); // body
const localHighScore = localStorage.getItem("hscore"); // locally stored high score
document.querySelector("#num").value = ""; // empty input on reload
const checkButton = document.querySelector("#check"); // check button
const theme = document.querySelector("#theme"); // theme

// set initial score
let score = 20;
scoreHtml.textContent = score;

// if high score is stored locally then dispaly it
localHighScore
  ? (highScoreHtml.textContent = localHighScore)
  : (highScoreHtml.textContent = 0);

// on click compare user number with random number
checkButton.onclick = () => {
  // get user input
  const userNumber = document.querySelector("#num").value;

  if (userNumber) {
    // only 20 attempts are allowed, so if score is 1 or below then game over
    if (score <= 1) {
      textRes.textContent = `Game Over! Try again...`; // show fail text
      body.style.backgroundColor = "rgb(225, 70, 70)"; // show red bg
      checkButton.disabled = true;
      return;
    }

    // compare user input with random generated number
    if (userNumber > number) {
      textRes.textContent = `Too High!`;
      scoreHtml.textContent = --score;
    } else if (userNumber < number) {
      textRes.textContent = `Too Low!`;
      scoreHtml.textContent = --score;
    } else {
      checkButton.disabled = true;
      numberRes.textContent = number; // show success number
      textRes.textContent = `Correct Number!`; // show success text
      body.style.backgroundColor = "#46e146"; // show green bg

      /**
       * High Score
       * - Get high score from local store
       * - if high socre is set then
       *  - check if random number is greater than local stored number then update local store
       * - else set local store
       */
      if (localHighScore) {
        if (localHighScore < number) {
          localStorage.setItem("hscore", number);
          highScoreHtml.textContent = number;
        }
      } else {
        localStorage.setItem("hscore", number);
        highScoreHtml.textContent = number;
      }
    }
  }
};

document.querySelector("#retry").onclick = () => {
  location.reload();
};

// theme
const dark = function () {
  body.style.backgroundColor = "rgb(43, 42, 51)";
  body.style.color = "#fff";
  theme.value = 0;
  theme.textContent = `Bright`;
};

const bright = function () {
  body.style.backgroundColor = "#fff";
  body.style.color = "rgb(43, 42, 51)";
  theme.value = 1;
  theme.textContent = `Dark`;
};

// change theme
theme.onclick = () => {
  // 0 - dark, 1 - bright
  Number(theme.value) ? dark() : bright();
};
