/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

/**
 * SOLUTION I. Normal Way
 */

const calcAverageHumanAge = function (dogsAge) {
  // 1. convert dog ages to human ages
  const humansAge = dogsAge.map(function (age) {
    if (age <= 2) return 2 * age;
    else return 16 + age * 4;
  });

  // 2. human age should be atleast 18
  const adultDogs = humansAge.filter(function (age) {
    return age >= 18;
  });

  // 3. calculate average age of adult dogs
  const avgAge =
    adultDogs.reduce(function (acc, age) {
      return acc + age;
    }, 0) / adultDogs.length;

  console.log(avgAge);
  // console.log({ humansAge, adultDogs, avgAge });
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // -> 44
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // -> 47.33

/**
 * SOLUTION II. Arrow function & function chaining
 */

// Note: 2 ways of calculating Average
// way 1: (2+3)/2 = 2.5
// way 2: 2/2 + 3/2 = 2.5

const calcAverageHumanAgev2 = dogsAge =>
  dogsAge
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAgev2([5, 2, 4, 1, 15, 8, 3])); // -> 44
console.log(calcAverageHumanAgev2([16, 6, 10, 5, 6, 1, 4])); // -> 47.33
