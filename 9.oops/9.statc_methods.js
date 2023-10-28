/**
 * We can call various methods on arrays like indexOf, forEach, map, etc.
 * This is because these methods are defined in Array.prototype property.
 *
 * However, we can't call from() method on an array.
 * Because, from() is not defined in Array.prototype.
 * Instead, it's defined in the Array Constructor itself.
 * So, instances/objects of Array don't  have access to this method.
 * The methods that are defined in the Constructor rather than its prototype are called as 'Static Methods'.
 * We also say that form() method is in Array Namespace.
 */

const num = [25, 45, 5, 25, 54];

// .form() doesn't exists in Array.prototype
// num.from(); // ->  num.from is not a function

// STATIC METHOD IN CONSTRUCTOR FUNCTION
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Static Method defined in Person Namespace
Person.greet = function () {
  console.log(`Hey there!!!`);
  console.log(this); // points to object it was called on which is in this case the Constructor Function itself
};

// Person's objects won't have access to greet()
const andy = new Person('Andy', 1995);
// andy.greet(); // -> TypeError: andy.greet is not a function

// Only the Constructor itself have access to greet()
Person.greet(); // -> Hey there!!!

// STATIC METHOD IN CLASSES
class PersonCl {
  // Constructor Function
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Instance Method
  // Inherit by all the PersonCl objects
  calcAge() {
    console.log(2050 - this.birthYear);
  }

  // Static Method
  // Objects can't inherit
  // Here, this points to the Constructor
  static greet() {
    console.log(`Hey there!!!`);
    // console.log(this); // points to object it was called on which is in this case the entire PersonCl class
  }
}

const sam = new PersonCl('Sam', 1992);
sam.calcAge(); // -> 58

// greet() isn't present in PersonCl.prototype
// sam.greet(); // -> TypeError: sam.greet is not a function

// Accessing static method
PersonCl.greet(); // -> Hey there!!!
