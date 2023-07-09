/**
 * Class inheritance using Constructor Function
 */

// Person
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return 2050 - this.birthYear;
};

const mike = new Person('Mike', 2000);
console.log(mike.calcAge()); // -> 50

// Student
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  // properties firstName & birthYear are also in Person Constructor
  // To avoid violating DRY principle we can inherit these properties from Person
  // by binding 'this' to Person
  // Here, Student's 'this' is passed to Person
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// INHERITANCE
// We want to inherit from Person's methods & properties i.e. Person.prototype
// So, Person will be a Parent class while Student will be Person's Child class
// To achieve this, we'll have to link Person.prototype to Student.prototype using Object.create()
// And this should be done before adding any method or property to Student.prototype
// Because Object.create() will overwrite all the methods & properties of Student.prototype
// Below statement will create an empty object & set its __proto__ to Person.prototype
// After linking the prototype, instances of Student will have access to Person.prototype
Student.prototype = Object.create(Person.prototype);

// Student prototype
Student.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.firstName} and I study ${this.course}`);
};

const sara = new Student('Sara', 2010, 'Computer Science');
console.log(sara); // -> Student {firstName: 'Sara', birthYear: 2010, course: 'Computer Science'}
sara.introduce(); // -> Hi, my name is Sara and I study Computer Science

// Accessing inherited method
// sara object doesn't contain calcAge() so JS will look for it in sara's prototype (sara.__proto__)
// sara.__proto__ also doesn't contain calcAge() so JS will look for it in prototype of sara's prototype (i.e. sara.__proto__.__proto__)
// Prototype Chain: sara prototype -> Person.prototype -> Object.Prototype -> null
console.log(sara.calcAge()); // -> 40

console.log(sara.__proto__); // -> Person {introduce: ƒ}
console.log(sara.__proto__.__proto__); // -> {calcAge: ƒ, constructor: ƒ}
console.log(sara.__proto__.__proto__.__proto__); // Object
console.log(sara.__proto__.__proto__.__proto__.__proto__); // Object.prototype which is null

// One problem with Object.create() is it will set the constructor of Student to Person i.e. Student.prototype.constructor = Person
console.log(Student.prototype.constructor); // -> [Function: Person]

// Student.prototype.constructor should point back to the Student constructor itself
Student.prototype.constructor = Student;
console.log(Student.prototype.constructor); // -> [Function: Student]
