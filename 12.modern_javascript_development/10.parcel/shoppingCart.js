// Exporting Module

console.log('Exporting module');

// Export with one value
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product}'s are added to cart.`);
};
