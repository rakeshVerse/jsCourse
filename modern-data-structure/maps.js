/**
 * Map is a data structure that maps keys to values.
 * Just like Objects, in Maps data is stored in key value pair.
 * The main difference between Maps & Object is the that in Map keys can have any data type (primitives, arrays, objects and other maps) while in Object keys are String type.
 */

// Create empty map
const rest = new Map();

// Add items using set()
rest.set("name", "Classico Italiano"); // string key
rest.set(1, "Firenze, Italy"); // number key

// Method chaining: set() returns the updated Map so we can chain multiple set methods to add items in Map
console.log(rest.set(2, "Lisbon, Portugal")); // returns updated Map -> Map(3) {size: 3, name => Classico Italiano, 1 => Firenze, Italy, 2 => Lisbon, Portugal}
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");

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
console.log(rest.get("categories")); // -> [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ]

// Complex example: check if restaurant open or closed
const time = 20; // 8pm
// (time > rest.get("open") && time < rest.get("close")) returns true or flase
console.log(rest.get(time > rest.get("open") && time < rest.get("close"))); // computes to rest.get(true) -> We are open :D

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
rest.set(arr, "Test");
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

// access value of key type Array
console.log(rest.get(arr)); // -> Test

// DOM element as key
rest.set(document.querySelector("h1"), "Heading"); // get h1 from the page and set it as a Key
