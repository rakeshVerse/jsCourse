/**
 * Functions that are passed as arguments to other functions are Callback functions
 */

const sum = arr => {
  let add = 0;
  for (const num of arr) add += num;
  return `Sum: ${add}`;
};

const multiply = arr => {
  let multiple = 1;
  for (const num of arr) multiple *= num;
  return `Multiplication: ${multiple}`;
};

const average = arr => {
  let avg = 0;
  for (const num of arr) avg += num;
  return `Average: ${avg / arr.length}`;
};

// count how many even & odd numbers are there in given array
const evenOddCount = arr => {
  let even = 0;
  let odd = 0;
  for (const num of arr) num % 2 === 0 ? even++ : odd++;
  return `Even: ${even}, Odd: ${odd}`;
};

// count how many prime numbers are there in given array
const primeCount = arr => {
  let count = 0;
  for (const num of arr) {
    let prime = true;
    for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) {
        prime = false;
        break;
      }
    }
    if (prime) count++;
  }

  return `Prime count: ${count}`;
};

// Higher Order Function
const compute = (arr, fn) => {
  console.log(fn);
  console.log(fn(arr)); // callback
};

// Calling higher order function with another functions as arguments
compute([2, 5, 8, 9, 10, 11, 12, 13, 14], evenOddCount);
// compute(
//   [97, 2, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//   primeCount
// );
// compute([2, 5, 6], multiply);
// compute([2, 5, 10], sum);
// compute([2, 5, 8, 90, 5], average);
