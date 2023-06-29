/**
 * Array methods: slice, splice, reverse, concat, join
 */

// SLICE - Slices array by given args and return new array. It doesn't muatate original array.
// Syntax: array.slice(firstIndex, lastIndex). Last index is excluded in the result.
// In absence of lastIndex slice will return all the remaining elements
const num = [1, 2, 3, 4, 5, 6, 7];
// console.log(num.slice(1, 6)); // -> [2, 3, 4, 5, 6]
// console.log(num.slice(2)); // -> [3, 4, 5, 6, 7]
// console.log(num.slice(0, -2)); // -> [1, 2, 3, 4, 5]
// console.log(num.slice(-1)); // get last element -> [7]
// console.log(num); // original array stays the same -> [1, 2, 3, 4, 5, 6, 7]

// SPLICE - Add or remove array items. It mutates the original array.
// Syntax: array.splice(startIndex, deleteCount)
const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(letters.splice(1)); // -> ['b', 'c', 'd', 'e', 'f']
// console.log(letters); // original array mutated -> ['a']

// remove all elements
// console.log(letters.splice(0));  // -> ['a', 'b', 'c', 'd', 'e', 'f']
// console.log(letters); // -> []

// remove 2 elements from position 1
// console.log(letters.splice(1, 2)); // -> ['b', 'c']
// console.log(letters); // -> ['a', 'd', 'e', 'f']

// remove last elment from original array
// console.log(letters.splice(-1)); // -> ['f']
// console.log(letters); // ->  ['a', 'b', 'c', 'd', 'e']

// REVERSE - Mutates the original array
const arr = [5, 4, 3, 2, 1];
// arr.reverse();
// console.log(arr); // -> [1, 2, 3, 4, 5]

// CONCAT - Doesn't mutate original array
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [8, 9, 10, 11];
const arr3 = arr1.concat(arr2); // concatinates
// console.log(arr3); // -> [1, 2, 3, 4, 5, 8, 9, 10, 11]

// Concatination can also be done using spread operator
// console.log([...arr1, ...arr2]); // -> [1, 2, 3, 4, 5, 8, 9, 10, 11]

// JOIN - Joins array elments by given divider and returns a string. Doesn't mutate original array
// console.log(arr3.join(' ~ ')); // -> 1 ~ 2 ~ 3 ~ 4 ~ 5 ~ 8 ~ 9 ~ 10 ~ 11

// ES22 - AT METHOD - Returns item of given index
const count = [5, 34, 54, 6];
console.log(count[0]); // traditional bracket notation -> 5
console.log(count.at(0)); // new at method -> 5

// Get last element of an array
// 1. traditional square bracket
console.log(count[count.length - 1]); // -> 6

// 2. slice
console.log(count.slice(-1)[0]); // -> 6

// 3. at method
console.log(count.at(-1)); // -> 6
