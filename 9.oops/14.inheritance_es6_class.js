// INHERITANCE IN ES6 CLASSES

// Person (Parent Class)
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  greet() {
    console.log(`Hello ${this.fullName}!`);
  }

  calcAge() {
    return 2050 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`Error: ${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

// Student (Child Class)

// 1. Without constructor
// If we have exact params for Student constructor as Person constructor then we don't have to define Student constructor
class Student extends Person {}

const mike = new Student('Mike Smith', 2020);
console.log(mike); // -> Student {_fullName: 'Mike Smith', birthYear: 2020}

// 2. With constructor
// Defining constructor since we have one more param 'course' in Student constructor
class Student1 extends Person {
  constructor(fullName, birthYear, course) {
    // super() is Parent's (i.e. Person) constructor
    // super() must happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`Hi, my name is ${this.fullName} and I study ${this.course}`);
  }

  // Polymorphism
  greet() {
    console.log(`Hello ${this.fullName}! So, you are a Student, right?`);
  }
}

const sara = new Student1('Sara Smith', 2030, 'Computer Science');
console.log(sara); // -> Student1 {_fullName: 'Sara Smith', birthYear: 2030, course: 'Computer Science'}
sara.introduce(); // -> Hi, my name is Sara Smith and I study Computer Science

// Overwriting Parent's greet()
sara.greet(); // -> Hello Sara Smith! So, you are a Student, right?

// Accessing method of Parent class
console.log(sara.calcAge()); // -> 20

// Prototype Chain
console.log(sara.__proto__); // -> Person {constructor: ƒ, introduce: ƒ, greet: ƒ}
console.log(sara.__proto__.__proto__); // Person.prototype -> {constructor: ƒ, greet: ƒ, calcAge: ƒ, fullName: <accessor>}
console.log(sara.__proto__.__proto__.__proto__); // Object
console.log(sara.__proto__.__proto__.__proto__.__proto__); // Object.prototype which is null
