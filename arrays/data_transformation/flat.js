/**
 * flat() removes nested arrays OR flatend the array
 */

// By default, it goes one level deep
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // -> [1, 2, 3, 4, 5, 6, 7, 8]

// Two level deep
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // -> [1, 2, 3, 4, 5, 6, 7, 8]

// EXAMPLE
// Get the total balance that is sum of all the transactions of all accounts
const accounts = [
  {
    owner: 'Jonas Schmedtmann',
    transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: 'Jessica Davis',
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: 'Steven Thomas Williams',
    transactions: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: 'Sarah Smith',
    transactions: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

// 1. Create a new array that constains transaction array from all account
const allTransactions = accounts.map(acc => acc.transactions);
console.log(allTransactions); // retruns nested arrays

// 2. Flaten the nested array
const transactions = allTransactions.flat();
console.log(transactions); // -> [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

// 3. Add all the elements together
const totalBalance = transactions.reduce((acc, amt) => acc + amt, 0);
console.log(totalBalance); // -> 17840

// CHAINING ABOVE EXAMPLE
const finalBalance = accounts
  .map(acc => acc.transactions)
  .flat()
  .reduce((acc, amt) => acc + amt, 0);
console.log(finalBalance); // -> 17840

// FLATMAP
// Since, map() & flat() are often use together. For performance, we have flatMap() that does the job of map().flat()
// It maps a new array then flatens it
const balance = accounts
  .flatMap(acc => acc.transactions)
  .reduce((acc, amt) => acc + amt, 0);
console.log(finalBalance); // -> 17840
