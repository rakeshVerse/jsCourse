/**
 * Set is a collection of unique values meaning a Set can never have duplicate values.
 * It is used to get unique elements from Iterables (Array, Object, Maps, String).
 * Set doesn't has index, so we can't access its elements. However, we can loop over a Set.
 *
 * Syntax: new Set (Iterable)
 */

const snacks = [
  'pizza',
  'pizza',
  'burger',
  'pizza',
  'momos',
  'samosa',
  'pasta',
  'samosa',
];

/**
 * Working with Arrays
 */

// remove duplicate elements by creating a set from an array
const uniqueSnacks = new Set(snacks);
console.log(uniqueSnacks); // -> Set(5) { pizza, burger, momos, samosa, pasta}

// get size of Set
console.log(uniqueSnacks.size); // get the total number of unique snacks -> 5
console.log(new Set(snacks).size); // direct -> 5

// check if element present in a Set
console.log(uniqueSnacks.has('hotdog')); // -> false
console.log(uniqueSnacks.has('pasta')); // -> true

// add elements to Set
uniqueSnacks.add('garlic bread');
uniqueSnacks.add('garlic bread');
console.log(uniqueSnacks); // -> Set(6) { pizza, burger, momos, samosa, pasta, garlic bread}

// delete item from Set
uniqueSnacks.delete('burger');
console.log(uniqueSnacks); // -> Set(5) { pizza, momos, samosa, pasta, garlic bread}

// delete all items
uniqueSnacks.clear();
console.log(uniqueSnacks); // -> Set(0) {}

// Set doesn't has index so we can't access its elements
const snackOne = uniqueSnacks[0]; // doesn't work
console.log(snackOne); // -> undefined

// loop over Set
for (const snack of uniqueSnacks) console.log(snack);

// Set to Array
const uniqueSnacksArray = [...new Set(uniqueSnacks)];
console.log(uniqueSnacksArray); // -> ['pizza', 'momos', 'samosa', 'pasta', 'garlic bread']

// create a Set from a String as String is an Iterable
console.log(new Set('akshaysingh')); // -> Set(8) { 'a', 'k', 's', 'h', 'y', 'i', 'n', 'g' }
console.log(new Set('akshaysingh').size); // get unique letters -> 8

// Note: Set is case-sensetive meaning - a & A will be considered as unique values not duplicate
console.log(new Set('AkshaySingh')); // -> Set(10) { 'A', 'k', 's', 'h', 'a', 'y', 'S', 'i', 'n', 'g' }
