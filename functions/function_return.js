/**
 * Functions that returns another function are Higher Order Functions. It's very useful in Functional Programming.
 */

/**
 * Normal function example
 */
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!!!`);
  };
};

// two ways of calling:
// 1st
const greeter = greet("Hi"); // greet() returns a function and store it in a variable 'greeter'
greeter("John"); // since, greeter holds returned function, we can call it with argument -> Hi, John!!!

// 2nd
// Syntax: higherOrderFunction(args)(returnedFunctionArgs)
greet("Hello")("Ram"); // -> Hello, Ram!!!

/**
 * Arrow function example
 */
const greetMe = (greeting) => (name) => console.log(`${greeting}, ${name}!!!`);
greetMe("Hey")("Bob"); // -> Hey, Bob!!!
