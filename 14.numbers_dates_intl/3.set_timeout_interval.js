// I. Set Timeout: Shedule to execute a block in future for once

// 1.
setTimeout(() => console.log(`Waited for 3 seconds`), 3000);
console.log(`Waiting...`);

// 2. Passing arguments
const pets = ['cats', 'dogs'];
setTimeout(
  (pet1, pet2) => console.log(`I like ${pet1} and ${pet2}`),
  3000,
  ...pets
);

// 3. Cancel timeout if option contains 'elephants'
const animals = ['cats', 'elephants'];
const petTimer = setTimeout(
  (pet1, pet2) => console.log(`I like ${pet1} and ${pet2}`),
  3000,
  ...animals
);
if (animals.includes('elephants')) clearTimeout(petTimer);

// II. Set Interval: Execute the block every given seconds

setInterval(() => console.log('hi'), 3000);
