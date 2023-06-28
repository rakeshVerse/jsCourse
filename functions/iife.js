/**
 * IIFE: Immediately Invoked Function Expression Pattern
 *
 * IIFE pattern is used to execute a function only once
 *
 * This pattern is created by wrapping unnamed function in paranthesis and then call it right away
 *
 * This pattern is useful for scoping variables
 *
 * In modern JS, this pattern is not used that much cause we can scope variables simply by wrapping then in a block ({})
 */

// NORMAL FUNCTION
(function () {
  console.log(`Invoked immediately`);
})();

// ARROW FUNCTION
(() => console.log(`IIFE pattern using arrow function`))();

// VARIABLE SCOPE
// IIFE Pattern is also used to encapsulating variables in a scope
// But that can be done with just wrapping variables in a block like so
{
  const msg = `Hello Everyone`;
}

console.log(msg); // ERROR -> msg is not defined
