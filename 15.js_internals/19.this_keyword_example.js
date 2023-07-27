'use strict';

// 1. In global scope 'this'  is Browser's Window object
console.log(this); // Window object

// 2. In regular function, 'this' is undefined in strict mode, in sloppy mode 'this' is global window object
function dummy() {
  console.log(this); // undefined
}
dummy();

// 3. Arrow functions don't have 'this', so 'this' in an arrow function is 'lexical this'
// 'lexical this' is 'this' of parent, which is in the case global
const dummyArrow = () => {
  console.log(this); // Window object
};
dummyArrow();

// 4. In methods, 'this' points to object/instance calling the method, which is in this case Object 'user' itself
const user = {
  name: 'Mark',
  dummyMethod() {
    console.log(this);
    console.log(`User's name is ${this.name}`);
  },
};
user.dummyMethod(); // -> {name: 'Mark', dummyMethod: ƒ} User's name is Mark

// 5. Note, for methods, 'this' will always point to object calling it
const anotherUser = {
  name: 'John',
};

// Borrow method form 'user' object
anotherUser.dummyMethod = user.dummyMethod;

// 'this' points to 'anotherUser' object
anotherUser.dummyMethod(); // -> {name: 'John', dummyMethod: ƒ} User's name is John

// 6. Also, when calling a method through regular function, 'this' will be set to undefined
const dummyFunc = user.dummyMethod;
// dummyFunc(); // undefined

// 7. Function inside a method
const dummyObj = {
  firstName: 'Mark',
  foo() {
    const hello = function () {
      console.log(this); // 'this' inside regular functions is 'undefined' -> undefined
      console.log(`Hello, ${this.firstName}!`); // -> TypeError: Cannot read properties of undefined (reading 'firstName')
    };
    hello();
  },
};
// dummyObj.foo();

// Soution 1 (Pre ES6) - Store 'this' into a variable
const dummyObjSolution1 = {
  firstName: 'Mark',
  foo() {
    const self = this; // Storing this to a variable
    const hello = function () {
      console.log(self); // -> {firstName: 'Mark', foo: ƒ}
      console.log(`Hello, ${self.firstName}!`); // -> Hello, Mark!
    };
    hello();
  },
};
dummyObjSolution1.foo();

// Soution 2 (Post ES6) - Since, 'this' in arrow functions points to parent's 'this', we can use arrow function inside methods to maintain 'this'
const dummyObjSolution2 = {
  firstName: 'Mark',
  foo() {
    const hello = () => {
      // Here, 'this' points to parent's 'this' i.e. 'this' of foo()
      console.log(this); // -> {firstName: 'Mark', foo: ƒ}
      console.log(`Hello, ${this.firstName}!`); // -> Hello, Mark!
    };
    hello();
  },
};
dummyObjSolution2.foo();
// Some considerations:
// Objects curly braces don't create a scope. Those curly braces are just way of creating object literals
// Never use Arrow functions for Object Methods since, 'this' in arrow functions points to 'this' of parent, which yeilds unexpected result
