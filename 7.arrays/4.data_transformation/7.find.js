/**
 * find() returns the first element of an array that satisfies specific condition.
 *
 * It is similar to filter() in a way. The difference is:
 * - filter() returns all the elements that satisfies specific condition
 * - filter() returns an array
 */

// EXAMPLE I
const transac = [120, 457, -99, 487, -58, -97, 855, -9, 897];
const firstNegativeNum = transac.find(amt => amt < 0); // -99 is the first element that satisfies the given condition
// console.log(firstNegativeNum); //  -> -99

// EXAMPLE II
const accounts = [
  {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

// Each object is an element of 'accounts' array. So, find() returns an object that matches given condition.
const userSarah = accounts.find(accObj => accObj.owner === 'Sarah Smith');
console.log(userSarah); // -> {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444}
