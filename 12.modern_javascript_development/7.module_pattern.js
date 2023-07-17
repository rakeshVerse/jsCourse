// MODULE PATTERN

// Module Pattern is pre ES6 way of creating Moudules like structure
// It encapsulates functionality, make data private and exposes a Public API.

// Problems with module pattern
// If you want to have one module per file then you'll have to create different scripts for each module and link them in HTML.
// Problem is in HTML, sequence of the script matters, all the Public API populates the global scope and Module bundler doen't work
// on Module Pattern

// You should use ES6 Modules only, and in case you have to work on platforms that don't support ES6
// then just use code transpiler like Bable to convert ES6 Modules to Module Pattern

// To create a Module Pattern we use IIFE because we don't want to run this function multiple times.
// We just it to run once and return the data which we can later access & manuplate because of Closures.

const shoppingCart = (function () {
  const totalPrice = 200;
  const totalQuantity = 20;
  const cart = [];
  const shippingCost = 20;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product}'s are added to cart.`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product}'s are ordered from supplier.`);
  };

  // Public API
  return {
    cart,
    totalPrice,
    addToCart,
  };
})();

console.log(shoppingCart.shippingCost); // can't access private data -> undefined
console.log(shoppingCart.totalPrice); // -> 200

// Manupulating data (Closures in action)
console.log(shoppingCart.cart); // -> []
shoppingCart.addToCart('pizza', 20); // -> 20 pizza's are added to cart.
console.log(shoppingCart.cart); // -> [ { product: 'pizza', quantity: 20 } ]
