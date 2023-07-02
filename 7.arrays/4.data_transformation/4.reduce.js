/**
 * reduce() boils/reduces to all array elements into a single value (e.g. sum of all elements of an array)
 *
 * reduce() loops over array & for each item calls a Callback function
 *
 * It accepts 2 arguments: Callback function & Initial value for accumulator
 *
 * Syntax: array.reduce(function(accumulator, current-item, index, array){}, intial-value)
 *
 */

// EXAMPLE - Calculate the balance
const transaction = [120, 457, -99, 487, -58, -97, 45, -98, 789, -8, -897];

// Anonymous function
const balance = transaction.reduce(function (acc, curr, i, arr) {
  return acc + curr;
}, 0);

// Arrow function
const balance = transaction.reduce((acc, curr) => acc + curr, 0);
console.log(balance); // -> 641

// EXAMPLE - Get the maximum amount
const max = transaction.reduce(
  (acc, amt) => (acc > amt ? acc : amt),
  transaction[0]
);
console.log(max); // -> 789

// EXAMPLE - Get the minimum amount
const min = transaction.reduce(
  (acc, amt) => (acc < amt ? acc : amt),
  transaction[0]
);
console.log(min); // -> -897
