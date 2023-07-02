/**
 * Decide the winner based on average socres
 */

// average scores
// const averageScoreDolphins = (96 + 108 + 89) / 3;
// const averageScoreKoalas = (88 + 91 + 110) / 3;

// bonus 1
// const averageScoreDolphins = (97 + 112 + 101) / 3;
// const averageScoreKoalas = (109 + 95 + 123) / 3;

// bonus 2
const averageScoreDolphins = (97 + 112 + 101) / 3;
const averageScoreKoalas = (109 + 95 + 106) / 3;

console.log(averageScoreDolphins, averageScoreKoalas);

const minScore = 100;

if (
  averageScoreDolphins > averageScoreKoalas &&
  averageScoreDolphins >= minScore
)
  console.log(`Winner: Dolphins`);
else if (
  averageScoreDolphins === averageScoreKoalas &&
  averageScoreDolphins >= minScore &&
  averageScoreKoalas >= minScore
)
  console.log(`Draw`);
else if (
  averageScoreDolphins < averageScoreKoalas &&
  averageScoreKoalas >= minScore
)
  console.log(`Winner: Koalas`);
else console.log(`No winner`);
