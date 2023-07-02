const restaurant = {
  name: "Classico Italiano",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    fri: {
      open: 12,
      close: 9,
    },
    sat: {
      open: 2,
      close: 5,
    },
  },
  orderDelivery: function ({ starterIndex, mainIndex, address, time }) {},
};

/**
 * Unpack object:
 * syntax: { property-name, property-name } = obj
 */
const { name, starterMenu, categories } = restaurant;
console.log(name, starterMenu, categories);

/**
 * Named unpack object:
 * syntax: { property-name: variable-name, propert-ynameL variable-name } = obj
 */
const {
  name: restaurantName,
  starterMenu: start,
  categories: cat,
} = restaurant;
console.log(restaurantName, start, cat);

/**
 * Default value, in case property doesn't exists:
 * syntax: { property-name: variable-name = [], property-name variable-name = [] } = obj
 */

// property menu doesn't exists
const { menu: start = [], categories: cat = [] } = restaurant;
console.log(start, cat); // -> [] ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

/**
 * Mutate variables
 */
let x = 34;
let y = 50;
const num = { x: 2, y: 3, z: 4 };
({ x, y } = num); // mutating x and y with object num values
console.log(x, y); // -> 2 3

/**
 * Nested unpack
 */
const {
  openingHours: {
    fri: { open, close },
  },
} = restaurant;
console.log(open, close); // -> 12 9

/**
 * Named nested unpack
 */
const {
  openingHours: {
    fri: { open: o, close: c },
  },
} = restaurant;
console.log(o, c); // -> 12 9

/**
 * Unpack object directly in funtion parameter
 */
const restaurant1 = {
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  orderDelivery: function ({ starterIndex, mainIndex, address, time }) {
    console.log(
      `Order of ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliver on ${address} at ${time}`
    ); // -> Order of Garlic Bread and Pasta will be deliver on New York, US at 12:05
  },
};

const delivery = {
  address: "New York, US",
  time: "12:05",
  starterIndex: 2,
  mainIndex: 1,
};
restaurant1.orderDelivery(delivery);

/**
 * Unpack object directly in funtion parameter with Default values
 */
const restaurant2 = {
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    address,
    time = "5:00",
  }) {
    console.log(
      `Order of ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliver on ${address} at ${time}`
    ); // -> Order of Garlic Bread and Pizza will be deliver on New York, US at 5:00
  },
};

restaurant2.orderDelivery({
  address: "New York, US",
  starterIndex: 2,
});
