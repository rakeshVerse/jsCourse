/**
 * Spread Operator: Expand all the elements of iterables (arrays, strings, sets, maps but not objects) at once without creating variables. It's used to build arrays and pass values to function parameter.
 */

const restaurant = {
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

/**
 * accessing array elements
 */
const arr = [2, 3, 4, 6, 7, 89];
console.log(arr); // -> [2, 3, 4, 6, 7, 89]
console.log(...arr); // -> 2 3 4 6 7 89

/**
 * insert another array into an array
 */
console.log([1, 2, arr, 98]); // will create nested array -> [1, 2, [2, 3, 4, 6, 7, 89], 98]
console.log([1, 2, ...arr, 98]); // spread operator won't create nested array -> [1, 2, 2, 3, 4, 6, 7, 89, 98]

const newMenu = [...restaurant.mainMenu, "Dosa"];
console.log(newMenu); // -> ['Pizza', 'Pasta', 'Risotto', 'Dosa']

/**
 * Copy array
 */
const restataurantArr = [...restaurant.starterMenu];
console.log(restataurantArr); // ->  ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

/**
 * join two arrays
 */
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu); // -> ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

/**
 * using spread operator on string to build array
 */
const myName = "Rakesh";
const myNameArr = [...myName, " ", "R."];
console.log(myNameArr); // ->  ['R', 'a', 'k', 'e', 's', 'h', ' ', 'R.']
console.log(...myNameArr); // ->  R a k e s h   R.

/**
 * passing array values to function
 */
const topings = ["cottage cheeze", "chicken", "basil leaves"];

restaurant.orderPizza(...topings); // -> Here's your delicious Pizza with cottage cheeze, chicken and basil leaves!

/**
 * Using spread operator on Objects
 */

/**
 *   creating a new Object from an existing Object with additional properties
 */
const newRestaurant = { fonundedIn: 1400, ...restaurant, founder: "John Doe" };
console.log(newRestaurant);

/**
 * Create shallow copy of an Object using spread operator because assingment will create
 * a new reference object but not copy.
 *
 * Any changes made to restaurantCp1 will also change restaurant object
 * as restataurantCp1 is a refrence not a copy of restaurant object.
 *
 * To create a copy we use spread operator
 *
 */
const restaurantCp1 = restaurant; // creates a new reference
restaurantCp1.name = "Rock Restro"; // change will reflect on both the objects
console.log(restaurant); // -> {name: 'Rock Restro', categories: Array(4), starterMenu: Array(4), mainMenu: Array(3), orderPizza: ƒ}
console.log(restaurantCp1); // -> {name: 'Rock Restro', categories: Array(4), starterMenu: Array(4), mainMenu: Array(3), orderPizza: ƒ}

const restaurantCp2 = { ...restaurant }; // creates a copy
restaurantCp2.name = "Rock Restro"; // chaning copyied object won't affect the original object
console.log(restaurant); // -> {name: 'Classic Italian', categories: Array(4), starterMenu: Array(4), mainMenu: Array(3), orderPizza: ƒ}
console.log(restaurantCp2); // -> {name: 'Rock Restro', categories: Array(4), starterMenu: Array(4), mainMenu: Array(3), orderPizza: ƒ}
