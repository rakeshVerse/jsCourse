// Importing Module
// import cloneDeep from './node_modules/lodash/cloneDeep.js';
import { cloneDeep } from 'lodash'; // we don't have to mention the entire path, parcel will find the dependency
import { addToCart } from './shoppingCart.js';

console.log('Importing module');

// Import one value
addToCart('Pizza', 10); // -> 10 Pizza's are added to cart.

const restaurant = {
  dishes: [
    { name: 'pizza', quantity: 5 },
    { name: 'pasta', quantity: 15 },
  ],
  ingredients: ['flour', 'oil', 'basil', 'salt', 'pepper'],
  user: { loggedIn: false },
};

const restaurantClone = Object.assign({}, restaurant); // Cloning in native JS
const restaurantDeepClone = cloneDeep(restaurant); // Cloning using Lodash cloneDeep.js

// Manupulating restaurant object
restaurant.user.loggedIn = true;

console.log(restaurantClone);
console.log(restaurantDeepClone);
/** -> 
{
  dishes: [ { name: 'pizza', quantity: 5 }, { name: 'pasta', quantity: 15 } ],
  ingredients: [ 'flour', 'oil', 'basil', 'salt', 'pepper' ],
  user: { loggedIn: true }
}
{
  dishes: [ { name: 'pizza', quantity: 5 }, { name: 'pasta', quantity: 15 } ],
  ingredients: [ 'flour', 'oil', 'basil', 'salt', 'pepper' ],
  user: { loggedIn: false }
} 
*/
// HOT MODULE REPLACEMENT
// On save, auto build and reflect changes live without reload
if (module.hot) {
  module.hot.accept();
}
