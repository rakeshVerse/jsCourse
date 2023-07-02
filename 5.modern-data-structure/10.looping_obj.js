/**
 * Loop over objects
 */

const openingHours = {
  thu: {
    open: 12,
    close: 9,
  },
  fri: {
    open: 10,
    close: 6,
  },
  sat: {
    open: 2,
    close: 5,
  },
};

// Get Keys
const keys = Object.keys(openingHours); // returns array of keys -> ['thu', 'fri', 'sat']
for (const day of keys) console.log(day); // loop over keys array

// Get Values
const values = Object.values(openingHours); // returns array of values
console.log(values);
for (const { open, close } of values) console.log(open, close); // loop over values array

// Get Keys and Values
const entries = Object.entries(openingHours); // returns array of keys and values
console.log(entries);
for (const [key, { open, close }] of entries) console.log(key, open, close);
