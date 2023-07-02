// MANUAL WAY
const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// CREATING ARRAYS PROGRAMMATICALLY
// I. arrays + fill method
const x = new Array(7); // creates an empty array of size 7
console.log(x); // -> [ <7 empty items> ]
x.fill(1, 3, 5); // fill value 1 from position 3 to 4 (last index is excluded)
console.log(x); // -> [ <3 empty items>, 1, 1, <2 empty items> ]

x.fill(1); // fill entire array with value 1
console.log(x); // -> [1, 1, 1, 1, 1, 1, 1]

arr.fill(23, 2, 6); // fills 23 from position 2 to 5
console.log(arr); // -> [1, 2, 23, 23, 23, 23, 7]

// II. Array.from
// from(object, callback) calls a Callback function for each element
// callback(current-item, index)
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // -> [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // -> [1, 2, 3, 4, 5, 6, 7]

// Create an array of length 100 that consists random numbers
const randomArr = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 101)
);
console.log(randomArr);
