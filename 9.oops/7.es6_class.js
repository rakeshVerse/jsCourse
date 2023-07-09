// ES6 class is Syntactic sugar, behind the scence it implements Constructor Function & Prototype property

// Two ways of creating ES6 Classes

// 1. Class expression
// const Person = class {};

// 2. Class declaration
class Person {
  // Constructor Function
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property of Person
  calcAge() {
    console.log(2050 - this.birthYear);
  }

  greet() {
    console.log(`Hello ${this.firstName}!`);
  }
}

const ricky = new Person('Ricky', 1999);
ricky.greet(); // -> Hello Ricky!
ricky.calcAge(); // -> 51

console.log(ricky.__proto__ === Person.prototype); // -> true
