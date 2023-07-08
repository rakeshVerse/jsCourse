/**
 * PROTOTYPE
 *
 * Every function in JS has a property called Prototype including Constructor Functions.
 *
 * Every object of Constructor will have access to all the methods & properties defined in Constructor's Prototype property.
 *
 * We use prototype to define methods & properties.
 *
 * This way we avoid creating a copy of method for each instance/object of the Constructor.
 */

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const john = new Person('John', 1980);
const mike = new Person('Mike', 1990);

// Prototype Method:
// Now, there's only one copy of clacAge()
// And all the objects of Person can access calcAge() without being calcAge() function directly attached to all the objects themselves
// And this is essential for code performance
// 'this' keyword is set to object that is calling the method
Person.prototype.clacAge = function () {
  console.log(2050 - this.birthYear);
};

console.log(Person.prototype); // -> {clacAge: ƒ, constructor: ƒ}

// Acessing prototype method
// object 'john' itself doesn't contain calcAge(), it's accessing the Prototype method
john.clacAge(); // -> 70

// Note:
// Person.prototype is not a Prototype of person. It's a prototype of Person's objects
// Person.prototype is prototype of Person's objects john & mike
// We can confirm that using __proto__ property
console.log(john.__proto__); // -> {clacAge: ƒ, constructor: ƒ}

// 'new' keyword creates the __proto__ property on the object and set it to Constructor's Prototype
// This is how JS internally knows, that the certain object is connected to certain Prototype
console.log(john.__proto__ === Person.prototype); // -> true

// Further confirmation
// Person.prototype is a prototype of linked objects not the Person constructor
console.log(Person.prototype.isPrototypeOf(john)); // -> true
console.log(Person.prototype.isPrototypeOf(mike)); // -> ture
console.log(Person.prototype.isPrototypeOf(Person)); // -> false

// Prototype Property:
// Constructor properties are specific to Objects while Prototype properties are shared amongst all the objects
Person.prototype.species = 'Homo Sapiens';
console.log(john.species); // -> Homo Sapiens
console.log(mike.species); // -> Homo Sapiens

// Check if certain property belongs to the Object or not
console.log(john.hasOwnProperty('firstName')); // john has firstName property -> true
console.log(john.hasOwnProperty('species')); // john doesn't have species property, it's a Prototype property -> false

/**
 * PROTOTYPE CHAINING
 *
 * Every object has a Prototype and since a Prototype is an object too, so Prototype also has a Prototype.
 *
 * The prototype of Person.prototype is Object.prototype. Because it was created by build-in Object Constructor.
 *
 * And prototype of Object.prototype (i.e. prototype property of Object Constructor) is null
 *
 * Prototype Chain: Person.prototype -> Object.prototype -> null
 *
 * Note: When we create an object we basically call built-in Object Constructor
 * So, '{}' is equal to 'new Object()'
 */

console.log(john.__proto__); // Person.prototype
console.log(john.__proto__.__proto__); // Object.prototype (top of prototype chain)
console.log(john.__proto__.__proto__.__proto__); // null

// Every prototype has a .constructor that links back to the Constructor of the Prototype
console.dir(Person.prototype.constructor); // the Person Constructor itself
/** -> 
 ƒ (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
} 
*/

// Prototypal Inheritance on Built-In Objects
// When we create an array, we invoke Array Constructor. It has prototype property i.e. Array.prototype.
const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__); // Array.prototype consists of all the methods & properties we can use on arrays
console.log(arr.__proto__ === Array.prototype); // -> true

console.log(arr.__proto__.__proto__); // prototype of Array.prototype is Object.prototype since, arrays are objects too
console.log(arr.__proto__.__proto__.__proto__); // prototype of Object.prototype is null

// Adding a method to built-in Array.prototype
// This is although a bad practice and should be avoided
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); // -> [3, 6, 5, 9]

// Prototypal Inheritance on DOM Elements
// Since, DOM elements are also objects they have prototype too
// Prototype chain of h1: HTMLHeadingElement -> HTMLElement -> Element -> Node -> EventTarget -> Object -> null
const h1 = document.querySelector('h1');

// Prototypal Inheritance on Functions
// Prototype of a function contains the methods we use on functions like - call(), bind(), etc.
// Further, prototype of Function prototype is Object Constructor
console.dir(x => x + 1);
