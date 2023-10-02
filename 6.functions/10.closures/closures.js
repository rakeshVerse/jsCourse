/**
 * A child function has access to its parent function even if the parent function has completed its execution & is poped out from Call Stack.
 *
 * All the variables of the parent function will be stored in CLOSURES so that the child function can access them.
 */

// EXAMPLE I. FUNCTION RETURNING FUNCTION
// add() is a parent function & it returns a child function which is later stored in addTwoNums().
// addTwoNums() has access to variables of its parent function add() even after add() is out of Call Stack.
// This is because, CLOSURE stores all the variables of add().So, that addTwoNums() can access them.
// Here, addTwoNums() has access to variable 'firstNum'
const add = num => {
  const firstNum = num;

  return function (secondNum) {
    console.log(firstNum + secondNum);
  };
};

const addTwoNums = add(5);
addTwoNums(20); // -> 25

// EXAMPLE II. FUNCTION ASSIGNING A FUNCTION
let a;

function x() {
  const greeting = 'Hey';

  // assign a function to global variable 'a'
  a = function (name) {
    console.log(`${greeting}, ${name}`);
  };
}

x();
a('Aron'); // -> Hey, Aron

// Reassigning function to 'a'
function z() {
  const greeting = 'Hello';

  // assign a function to global variable 'a'
  a = function () {
    console.log(`${greeting}, Mike`);
  };
}

z();
a(); // -> Hello, Mike

// WITH EVENT LISTENER
// Here, event listener function is a child function which retain access to 'body' variable even after
// IIFE is poped out of call stack when the 'click' event is fired
(function () {
  const body = document.body;
  body.style.backgroundColor = 'black';

  const btn = document.querySelector('button');
  btn.addEventListener('click', function () {
    body.style.backgroundColor = 'blue';
  });
})();

// CLOSURE HAS HIGHER PRIORITY THAN GLOBAL VARIABLES
// Even though there's a 'count' variable declared globally
// 'count' of parent function counter() has higher-priority
const counter = function () {
  let count = 10; // scope declaration

  return function () {
    count++; // increments scope count
    console.log(count);
  };
};

let count = 10000; // global declaration
counter()(); // -> 11
