/**
 * Map is a data structure that maps keys to values.
 * Just like Objects, in Maps data is stored in key value pair.
 * The main difference between Maps & Object is the that in Map keys can have any data type (primitives, arrays, objects and other maps) while in Object keys are String type.
 */

// Create empty map
const rest = new Map();

// Add items using set()
rest.set('name', 'Classico Italiano'); // string key
rest.set(1, 'Firenze, Italy'); // number key

// Method chaining: set() returns the updated Map so we can chain multiple set methods to add items in Map
console.log(rest.set(2, 'Lisbon, Portugal')); // returns updated Map -> Map(3) {size: 3, name => Classico Italiano, 1 => Firenze, Italy, 2 => Lisbon, Portugal}
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest);
/** -> Map(8) {
  'name' => 'Classico Italiano',
  1 => 'Firenze, Italy',
  2 => 'Lisbon, Portugal',
  'categories' => [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
  'open' => 11,
  'close' => 23,
  true => 'We are open :D',
  false => 'We are closed :('
} */

// Read Map items using get()
console.log(rest.get('categories')); // -> [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ]

// Complex example: check if restaurant open or closed
const time = 20; // 8pm
// (time > rest.get("open") && time < rest.get("close")) returns true or flase
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // computes to rest.get(true) -> We are open :D

// Check if Map has key or not
console.log(rest.has(2)); // -> true
console.log(rest.has(3)); // -> false

// Delete an element
rest.delete(1);
console.log(rest);

// Delete all elements
// rest.clear();
// console.log(rest); // -> Map(0) {}

// Get size
console.log(rest.size); // -> 7

// Array as key
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest);
/** -> Map(8) {
  'name' => 'Classico Italiano',
  2 => 'Lisbon, Portugal',
  'categories' => [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
  'open' => 11,
  'close' => 23,
  true => 'We are open :D',
  false => 'We are closed :(',
  [ 1, 2 ] => 'Test' <-- Array as key
} */

// Access value of key type Array
console.log(rest.get(arr)); // -> Test

// DOM element as key
// rest.set(document.querySelector("h1"), "Heading"); // get h1 from the page and set it as a Key

// Create Map
// Another way of creating Maps is passing an array of arrays to Map()
// This way is better when creating a Map from scratch as doing so with set() is cumbersome
// When adding elements programmaticlly to a Map then set() should be used
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question); /** ->
Map(7) {
  'question' => 'What is the best programming language in the world?',
  1 => 'C',
  2 => 'Java',
  3 => 'JavaScript',
  'correct' => 3,
  true => 'Correct 🎉',
  false => 'Try again!'
}
*/

// Convert from Object to Map
// As we have seen, we can create a Map from an 'array of arrays'.
// We can also create a Map from an Object.
// Since, Object.entries(obj_name) returns an 'array of arrays'
// we can converting an Object to a Map like so:
const openingHoursObj = {
  mon: {
    open: 12,
    close: 22,
  },
  tue: {
    open: 11,
    close: 23,
  },
  wed: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const openingHoursMap = new Map(Object.entries(openingHoursObj)); // convert object to map
console.log(openingHoursMap); /**->
Map(3) {
  'mon' => { open: 12, close: 22 },
  'tue' => { open: 11, close: 23 },
  'wed' => { open: 0, close: 24 }
}
*/

// Looping over Maps:
// Since, Maps are Iterables we can iterate over Maps

// Quiz App: Check if user's answer is correct or not

console.log(question.get('question'));
// loop over Map to show options to select from
for (const [key, value] of question) {
  // select only numeric keys
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// get user answer
const answer = 3;
// const answer = Number(prompt("Enter your answer"));

// if answer is 3 then correct answer
console.log(question.get(question.get('correct') === answer));

// Convert Map to Array
console.log([...question]); // returns an array of arrays

// Accessing keys and values
// Just like Objects we can access keys and values of Maps like so
console.log([...question.keys()]); // returns an array of keys
console.log([...question.values()]); // returns an array of values
console.log([...question.entries()]); // returns an array of keys & values same as [...question]
