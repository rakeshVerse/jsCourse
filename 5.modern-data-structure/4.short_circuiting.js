/**
 * AND & OR operators can retrun values other than true or false. It's called short-circuiting.
 *
 * - OR will return the first truthty value or the last value if all operands are falsey.
 *   It is used to set default values.
 *
 * - AND will return the first falsey value or the last value if all operands are truthy.
 *   It is used to execute code in 2nd operand if the 1st operand it true.
 */

const restaurant = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Lasagna", "Pizza", "Pasta", "Risotto"],
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
 * OR short-circuiting
 */
console.log(3 || "Jonas"); // 3
console.log("" || "Jonas"); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || "" || "Hello" || 23 || null); // Hello

// assing default value using if else
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10

// assing default value using OR short-circuit
const guests2 = restaurant.numGuests || 10; // 10
console.log(guests2);

/**
 * AND short-circuiting
 */
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // Jonas
console.log("Hello" && 23 && null && "jonas"); // null

// practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
