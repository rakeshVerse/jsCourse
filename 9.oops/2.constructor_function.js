/**
 * Constructor functions is a way of simulating Classes. It is not a language feature. It is rather a pattern that developers have developed.
 *
 * Constructor function is a regular function excepts we call it using 'new' keyword.
 *
 * 'new' keyword does four things:
 * - creates an empty object {}
 * - set the empty object to 'this' keyword
 * - link the empty object ot Prototype
 * - auto return object/this when function is called
 *
 *
 * Since, Arrow function don't have 'this', we can't use them to create Constructor Functions.
 *
 * To create Constructor functions, use regular function or function expression.
 */

const Person = function (firstName, birthYear) {
  // Instance properties - Available to all the instances
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Method:
  // We should never create methods in this way
  // Suppose, we create 100 instances/objects, then all the 100 instances will have a copy of the method which is performance heavy
  // Instead, we use Prototype
  this.calcAge = function () {
    console.log(2050 - this.birthYear);
  };
};

const john = new Person('John', 1980); // john is an instance of Person
console.log(john); // -> Person { firstName: 'John', birthYear: 1980, calcAge: [Function (anonymous)] }

const mike = new Person('Mike', 1990); // another instance of Person
mike.calcAge(); // -> 60

// checks if specified object is an instance of specified Constructor function
console.log(john instanceof Person); // -> true
