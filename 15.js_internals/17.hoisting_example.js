// Hoisting and TDZ in Practice

// Variables
console.log(me); // -> undefined
// console.log(job); // -> ReferenceError: Cannot access 'job' before initialization
// console.log(year); // -> ReferenceError: Cannot access 'year' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3)); // -> 5
// console.log(addExpr(2, 3)); // -> ReferenceError: Cannot access 'addExpr' before initialization
console.log(addArrow); // -> undefined
// console.log(addArrow(2, 3)); // calling undefined i.e. undefined(2, 3) -> TypeError: addArrow is not a function

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example: Dangerous pitfall of Hoisting
// Here, we are accessing 'numProducts' before declaration which hoisted to 'undefined'
// And in the if block, we are reversing the falsy value to truthy value i.e. (!undefined) === truthy value
// All products will be deleted even though 'numProducts' is not 0

// If numProducts = 0, delete products
if (!numProducts) deleteShoppingCart();
var numProducts = 10;
function deleteShoppingCart() {
  console.log('All products deleted!');
}

// Variables declared with 'var' add a property to the window object
// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x); // -> true
// console.log(y === window.y); // -> false
// console.log(z === window.z); // -> false
