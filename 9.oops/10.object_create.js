/**
 * Object.create() is another way of simulating Classes
 *
 * Here, we first define the Prototype then manually link it to an Object.
 * This way we can link the Prototype to any object we want.
 */

// Prototype Object
const PersonProto = {
  clacAge() {
    console.log(2050 - this.birthYear);
  },

  // Set object properties
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Example 1
// Linking Prototype to an object
// PersonProto is now prototype of mark
const mark = Object.create(PersonProto);
console.log(mark); // -> {}

// setting property manually
mark.firstName = 'Mark';
mark.birthYear = 2000;

// Accessing Prototype method
mark.clacAge(); // -> 50

// Confirmation
console.log(mark.__proto__ === PersonProto); // -> true
console.log(PersonProto.isPrototypeOf(mark)); // -> true

// Example 2
// Set object properties programatically
const andy = Object.create(PersonProto);
andy.init('Andy', 2010); // set object properties
andy.clacAge(); // -> 40
