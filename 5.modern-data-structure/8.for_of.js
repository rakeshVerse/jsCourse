const restaurant = {
  name: "Classic Italian",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Lasagna", "Pizza", "Pasta", "Risotto"],
};

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// lopping through menu array
for (const item of menu) console.log(item);

// access index using entries()
// method 1: using index
for (const dish of menu.entries()) {
  // array.entries returns an array for each element along with index
  // dish contains array of [index, item]
  console.log(dish[0], dish[1]);
}

// method 2: using destructuring
for (const [index, dish] of menu.entries()) {
  console.log(index, dish);
}
