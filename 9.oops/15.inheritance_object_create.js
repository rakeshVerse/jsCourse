// SIMULATING CLASS INHERITANCE USING Object.create()

// Person
const PersonProto = {
  calcAge() {
    return 2050 - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// INHERITANCE

// Prototype Linking
// Link Person prototype to StudentProto
const StudentProto = Object.create(PersonProto); // creates an empty object & set its prototype to PersonProto

// Now, StudentProto has access to methods & properties of PersonProto
console.log(StudentProto.__proto__); // -> {calcAge: ƒ, init: ƒ}

// Student Prototype methods
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Hi, my name is ${this.firstName} and I study ${this.course}`);
};

// Further Prototype Linking
// Link an object e.g. sara to StudentProto Prototype
// so that sara has access to all the methods & properties of StudentProto
// and StudentProto already has access to all the methods & properties of PersonProto
// Now, sara has access to all the methods & properties of StudentProto (Child Class) & PersonProto (Parent Class)
const sara = Object.create(StudentProto);
console.log(sara.__proto__); // StudentProto -> {init: ƒ, introduce: ƒ}
console.log(sara.__proto__.__proto__); // PersonProto -> {calcAge: ƒ, init: ƒ}

sara.init('Sara', 2030, 'Computer Science');
console.log(sara); // -> {firstName: 'Sara', birthYear: 2030, course: 'Computer Science'}
sara.introduce(); // -> Hi, my name is Sara and I study Computer Science

// Accessing methods of PersonProto
console.log(sara.calcAge()); // -> 20
