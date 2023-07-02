/**
 * Rest is opposite of Spread operator.
 * Sread operator Unpacks array into individual elements while Rest operator Packs individual elements into an array.
 * Spread operator is used in RIGHT side of assignment (=).
 * Rest operator is used in LEFT side of assignment (=).
 *
 * Rest is used for: 1. Destructring iterables and 2. Function (REST parameter)
 */

const restaurant = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Lasagna", "Pizza", "Pasta", "Risotto"],
  openingHours: {
    fri: {
      open: 12,
      close: 9,
    },
    sat: {
      open: 2,
      close: 5,
    },
    sun: {
      open: 9,
      close: 6,
    },
  },
  orderPizza: function (mainTopping, ...otherToppings) {
    let str = `Here is you pizza with ${mainTopping}`;
    const arrLen = otherToppings.length;

    for (let i = 0; i < arrLen; i++) {
      if (arrLen - 1 === i) str += ` and ${otherToppings[i]}`; // last element
      else str += `, ${otherToppings[i]}`;
    }

    str += `!!!`;
    console.log(str);
  },
};

/**
 * I. Destructuring
 */

/**
 * Working with arrays
 */

// will put 3rd and rest elements into an array called others
const [a, b, ...others] = [3, 4, 6, 2, 3, 8, 9];
console.log(a, b, others); // -> 3 4 [6, 2, 3, 8, 9]

/**
 * REST (pack) & SPREAD (unpack) together.
 *
 * RIGHT side:
 *  - build an array by unpacking mainMenu and starterMenu arrays
 *  - assign individual elements to variables
 *
 * LEFT side:
 *  - assinging first & third elements to 'lasagna' & 'pasta'
 *  - pack rest of the elements into an array called 'otherDishes'
 */

const [lasagna, , pasta, ...otherDishes] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(lasagna, pasta, otherDishes); // -> Lasagna Pasta ['Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

/**
 * Working with Objects
 */
// destructure property 'sat' into a variable and rest of the properties into an array called 'restOfDays'
const { sat, ...restOfDays } = restaurant.openingHours;
console.log(sat, restOfDays); // -> {open: 2, close: 5} {fri: {…}, sun: {…}}

/**
 * II. Functions (Rest parameteres)
 *
 * Spread vs Rest
 * Spread operator is used where we otherwise pass values seperated by comma in parameters
 * Rest operator is used where  we otherwise accept variables seperated by comma in parameteres
 */

/**
 * We can pass multiple individual elements to a function call and build an array of them in function parameter
 */
// individual attributes will turn into an array 'nums'
const multiply = function (...nums) {
  let multiple = 1;
  for (let i = 0; i < nums.length; i++) {
    multiple *= nums[i];
  }

  console.log(multiple);
};

multiply(2, 3);
multiply(5, 3);
multiply(3, 6, 9, 3, 8);
multiply(...[5, 6]); // destructure array into individual elements then all function

/**
 * Restaurant example
 */
restaurant.orderPizza("chicken", "basil", "pineapple", "mozrella"); // -> Here is you pizza with chicken, basil, pineapple and mozrella!!!
restaurant.orderPizza("chicken"); // -> Here is you pizza with chicken!!!
