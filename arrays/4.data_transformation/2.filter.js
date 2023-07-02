/**
 * filter returns a new array containing origional array elements that passed specific test condition
 */

// EXAMPLE - Create an array of which contains only deposits
const transaction = [120, 457, -99, 487, -58, -97, 45, -98, 789, -8, -897];

const deposits = transaction.filter(function (amount) {
  // insert only items which are greater than 0
  return amount > 0;
});

console.log(deposits); // -> [120, 457, 487, 45, 789]

// EXAMPLE - Create an array of which contains only withdrawls (using arrow function)
const withdrawls = transaction.filter(amt => amt < 0);
console.log(withdrawls); // -> [-99, -58, -97, -98, -8, -897]
