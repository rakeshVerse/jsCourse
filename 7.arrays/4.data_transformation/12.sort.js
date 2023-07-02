/**
 * Sorting Arrays
 *
 * It mutates the original array
 */

// STRINGS
const owners = ['John', 'Zach', 'Aron', 'Marry'];
console.log(owners.sort()); // -> ['Aron', 'John', 'Marry', 'Zach']
console.log(owners); // -> ['Aron', 'John', 'Marry', 'Zach']

// NUMBERS
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// sort() directly doen't work on numbers as it work on strings
// Because, it turns the elements into string & then sorts them
// which gives unexpected results for number array
console.log(movements.sort()); // -> [-130, -400, -650, 1300, 200, 3000, 450, 70]

// This can be solve using below LOGIC
// To switch order, return > 0 (e.g. 1)
// To keep order, return < 0 (e.g. -1)

// Ascending
// if A > B return > 0 (switch order)
// if A < B return < 0 (keep order)
// Where, A is current element and B is next element

movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

// Above code can be optimized like so
// if a-b returns negative keep order else switch
movements.sort((a, b) => a - b);
console.log(movements); // -> [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending
// if A > B return < 0 (keep order)
// if A < B return > 0 (switch order)

movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

// optimized
movements.sort((a, b) => b - a);
console.log(movements); // -> [3000, 1300, 450, 200, 70, -130, -400, -650]
