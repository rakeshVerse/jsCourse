'use strict';

///////////////////////////////////////
// Scoping in Practice

function calcAge(birthYear) {
  const age = 2040 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output); // -> John, you are 49, born in 1991

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Mark';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str); // -> Oh, and you're a millenial, Mark

      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial); // -> true
    console.log(output); // -> NEW OUTPUT!
    // console.log(str); // Reference error
    // console.log(add(2, 3)); // Reference error
  }
  printAge();

  return age;
}

const firstName = 'John';
calcAge(1991);
// console.log(age); // Reference error
// printAge(); // Reference error
