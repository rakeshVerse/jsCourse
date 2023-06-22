const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// unpack array
const [x, y, z] = restaurant.mainMenu;
console.log(x, y, z); // -> Pizza Pasta Risotto

// partial unpack
const [a, b] = restaurant.mainMenu;
console.log(a, b); // -> Pizza Pasta

// skip values
let [first, , third] = restaurant.mainMenu;
console.log(first, third); // -> Pizza Risotto

// switch values
[first, third] = [third, first];
console.log(first, third); // -> Risotto Pizza

// unpack function returned array
const [starter, main] = restaurant.order(1, 2);
console.log(starter, main); // -> Bruschetta Risotto

// nested array
const nestedArr = [20, 2, [4, 5]];
const [q, w, [e, r]] = nestedArr;
console.log(q, w, e, r); // -> 20 2 4 5

// setting defaul values. Useful when we don't know the length of the array
const [main1, main2, main3, main4] = restaurant.mainMenu; // array has only 3 items so main4 is undefined
console.log(main1, main2, main3, main4); // -> Pizza Pasta Risotto undefined

// above problem can be solved by assining defalt values to variables
const [main5 = 1, main6 = 1, main7 = 1, main8 = 1] = restaurant.mainMenu;
console.log(main5, main6, main7, main8); // -> Pizza Pasta Risotto 1
