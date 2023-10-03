/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

// Solution 1: Method chaining
const calcAverageHumanAge = dogsAge =>
  dogsAge
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); // -> 44
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); // -> 47.33

// Solution 2: reduce() only
const calcAverageHumanAgeReduce = arr => {
  const { sum, count } = arr.reduce(
    ({ sum, count }, age) => {
      if (age > 2) {
        const humanAge = 16 + age * 4;
        return humanAge >= 18
          ? { sum: sum + humanAge, count: count + 1 }
          : { sum, count };
      }

      return { sum, count };
    },
    { sum: 0, count: 0 }
  );
  return `Average human age: ${sum / count}`;
};

console.log(calcAverageHumanAgeReduce([5, 2, 4, 1, 15, 8, 3])); // -> 44
console.log(calcAverageHumanAgeReduce([16, 6, 10, 5, 6, 1, 4])); // -> 47.33
