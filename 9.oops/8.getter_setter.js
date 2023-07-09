/**
 * Every object in JS can have getter & setter properties.
 *
 * These special properties are called accessor properties while normal properties are called data properties.
 *
 * getter & setter are basically functions that gets & sets the value respectively
 * but on the outside they look like regular object properties.
 *
 * getter & setter can be very useful for data validation.
 */

const account = {
  accountHolder: 'John',
  transactions: [200, -236, 254, 789],

  // Getter
  get latest() {
    return this.transactions.slice(-1).pop();
  },

  // Setter
  // Setter function must have only one parameter
  set latest(transac) {
    this.transactions.push(transac);
  },
};

// Access getter & setter functions like a property
// Getter
console.log(account.latest); // -> 789

// Setter
account.latest = 400;
console.log(account.transactions); // -> [200, -236, 254, 789, 400]

// GETTER & SETTER IN CLASSES
class Person {
  // Constructor Function
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  greet() {
    console.log(`Hello ${this.firstName}!`);
  }

  // Getter & Setter will be added to Person.prototype
  // Getter
  get age() {
    return 2050 - this.birthYear;
  }

  // Setter
  // Check if given name is a full name
  // If it is then set it else display error message
  // Here, setter function name is similar to Constructor property: fullName
  // So, when we call the Constructor, setter will execute automatically
  // This will generate a RangeError: Maximum call stack size exceeded
  // This is because both the Constructor & the Setter are trying to set the same property
  // set fullName(name) {
  //   if (name.includes(' ')) this.fullName = name;
  //   else console.log(`Error: ${name} is not a full name!`);
  // }

  // To resolve the naming conflict we use underscore
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`Error: ${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const andy = new Person('Andy Lee', 1995);

// Getter
console.log(andy.age); // -> 55

// Accessing full name
console.log(andy._fullName); // -> Andy Lee

// However, when we try to access fullName property it's return undefined as it is not set
// To resolve this we create a getter function
console.log(andy.fullName); // -> Andy Lee

const andrew = new Person('Andrew', 1992); // -> Error: Andrew is not a full name!
console.log(andrew.fullName); // -> undefined
