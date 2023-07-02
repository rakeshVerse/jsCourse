/**
 * Logical assignment operator: AND (&&=), OR (||=), nullish  (??=)
 */

const pizza = {
  size: 6,
  topping: "chicken",
  // topping: "",
};

const pizza1 = {
  size: 10,
  crust: "medium-crust",
};

/**
 * create property topping if doesn't exist
 */

// without assignment operator
pizza.topping = pizza.topping || "pineapple";
pizza1.topping = pizza1.topping || "pineapple";

console.log(pizza); // -> {size: 6, topping: 'chicken'}
console.log(pizza1); // -> {size: 10, crust: 'medium-crust', topping: 'pineapple'}

// OR assignment
pizza.topping ||= "pineapple";
pizza1.topping ||= "pineapple";

console.log(pizza); // -> {size: 6, topping: 'chicken'}
console.log(pizza1); // -> {size: 10, crust: 'medium-crust', topping: 'pineapple'}

// Null assignment
// if topping for pizza obj is "" then OR assingment will set it to pineapple since "" is a falsy value
// this issue can be solved using null assingment operator since "" is a truthy value
pizza.topping ??= "pineapple";
pizza1.topping ??= "pineapple";

console.log(pizza); // -> {size: 6, topping: ''}
console.log(pizza1); // -> {size: 10, crust: 'medium-crust', topping: 'pineapple'}

// AND assignment
pizza.topping &&= "pineapple";
pizza1.topping &&= "pineapple";

console.log(pizza); // -> {size: 6, topping: 'pineapple'}
console.log(pizza1); // -> {size: 10, crust: 'medium-crust'}
