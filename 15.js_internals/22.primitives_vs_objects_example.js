// PRIMITIVES TYPES
let lastName = 'Lee';
let oldLastName = lastName;
lastName = 'Smith';
console.log(oldLastName, lastName); // -> Lee Smith

// REFERENCE TYPES
const sara = {
  lastName: 'Lee',
};

// It doesn't creates a new object in the Heap, instead it creates a variable in CallStack that holds Heap address of Object 'sara'
// That's why changing properties of 'saraMarried' will change the original 'sara' Object.
// Because, both 'sara' and 'saraMarried' points to same address
const saraMarried = sara;
saraMarried.lastName = 'Smith';
console.log(`Before Marriage: ${sara.lastName}`); // -> Before Marriage: Smith
console.log(`After Marriage: ${saraMarried.lastName}`); // -> After Marriage: Smith

// OBJECT CLONING
// This problem can be solved by cloning Object using Object.assign()
const martha = {
  lastName: 'Musk',
};
const marthaMarried = Object.assign({}, martha);
marthaMarried.lastName = 'Reynolds';
console.log(`Before Marriage: ${martha.lastName}`); // -> Before Marriage: Musk
console.log(`After Marriage: ${marthaMarried.lastName}`); // -> After Marriage: Reynolds

// However, Object.assing() works only for 1st level properties.
// It won't work on the nested Objects. As,it doesn't creates a Deep Clone.
const lita = {
  lastName: 'Musk',
  hobbies: ['painting', 'singing'],
};
const litaMarried = Object.assign({}, lita);
litaMarried.hobbies.push('dancing');
console.log(`Hobbies Before: ${lita.hobbies}`); // -> painting,singing,dancing
console.log(`Hobbies After: ${litaMarried.hobbies}`); // -> painting,singing,dancing
