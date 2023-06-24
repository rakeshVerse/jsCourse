/**
 * Enhanced object literals. ES6 has introduced 3 new ways of writing object literals.
 */

// 1. No need to mention property name while adding an object into another

const openingHours = {
  fri: {
    open: 12,
    close: 9,
  },
  sat: {
    open: 2,
    close: 5,
  },
};

// old way
const restaurant = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Lasagna", "Pizza", "Pasta", "Risotto"],
  openingHours: openingHours,
};

// new way
const restaurant1 = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Lasagna", "Pizza", "Pasta", "Risotto"],
  openingHours, // ES6
};

// 2. New syntax for writing object functions
// old way
const restaurant2 = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  orderPizza: function (topping1, topping2, topping3) {
    console.log(
      `Here's your delicious Pizza with ${topping1}, ${topping2} and ${topping3}!`
    );
  },
};

// new way
const restaurant3 = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // ES6 - clean syntax
  orderPizza(topping1, topping2, topping3) {
    console.log(
      `Here's your delicious Pizza with ${topping1}, ${topping2} and ${topping3}!`
    );
  },
};

// 3. Compute property name
const days = ["mon", "tue", "wed", "thus"];
const hour = {
  [days[0]]: {
    open: 12,
    close: 9,
  },
  [`day-${4 + 1}`]: {
    open: 2,
    close: 5,
  },
};
console.log(hour); // -> {mon: {…}, day-5: {…}}
