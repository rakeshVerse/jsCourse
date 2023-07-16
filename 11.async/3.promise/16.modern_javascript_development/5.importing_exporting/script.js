// Importing Module

// // Importing without value
// import './shoppingCart.js';
// console.log('Importing module');

// // Import one value
// import { addToCart } from './shoppingCart.js';
// addToCart('Pizza', 10); // -> 10 Pizza's are added to cart.

// // Import multiple values
// import { totalPrice, totalQuantity } from './shoppingCart.js';
// console.log(totalPrice, totalQuantity); // -> 200 20

// // Import changed names of named exports
// import { price, quantity } from './shoppingCart.js';
// console.log(price, quantity); // -> 200 20

// // Change name of the named imports
// import { totalPrice as price } from './shoppingCart.js';
// console.log(price); // -> 200

// // Import everything

// // It returns an Object containing all the exports
// import * as shoppingCart from './shoppingCart.js';
// console.log(shoppingCart);
// /** ->
// Object {
//   addToCart: function addToCart(product, quantity),
//   totalPrice: 200,
//   totalQuantity: 20 ,
// }
// */

// shoppingCart.addToCart('Burger', 25); // -> 25 Burgers are added to cart.

// console.log(shoppingCart.totalPrice, shoppingCart.totalQuantity); // -> 200 20

// // Default Export
// import add, { addToCart } from './shoppingCart.js';
// add('Samosa', 16); // -> 16 Samosas are added to cart.
// addToCart('Jalebi', 20); // -> 20 Jalebis are added to cart.

// // Live Connection
// import { cart, addToCart } from './shoppingCart.js';
// console.log(cart); // -> Array []
// addToCart('Pizza', 5);
// addToCart('Pasta', 12);
// addToCart('Burger', 15);
// console.log(cart);
// /** ->
// Array(3) [
//   { product: "Pizza", quantity: 5 },
//   { product: "Pasta", quantity: 12 },
//   { product: "Burger", quantity: 15 } ,
// ]
// */
