// Exporting Module

// // Exporting without values
// console.log('Exporting module');

// // Export with one value
// const cart = [];

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product}'s are added to cart.`);
// };

// // Export multiple values
// const totalPrice = 200;
// const totalQuantity = 20;

// export { totalPrice, totalQuantity };

// // Change name of named exports
// const totalPrice = 200;
// const totalQuantity = 20;

// export { totalPrice as price, totalQuantity as quantity };

// // Change name of the named imports
// const totalPrice = 200;
// const totalQuantity = 20;

// export { totalPrice, totalQuantity };

// // Export everything

// console.log('Exporting module');

// const cart = [];

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product}s are added to cart.`);
// };

// const totalPrice = 200;
// const totalQuantity = 20;

// export { totalPrice, totalQuantity };

// // Default Export
// const cart = [];

// export default function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product}s are added to cart.`);
// }

// // A module cannot have multiple default exports.
// const totalPrice = 200;
// export default totalPrice; // error

// // Live Connection
// export const cart = [];

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product}s are added to cart.`);
// };
