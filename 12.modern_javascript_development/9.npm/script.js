import cloneDeep from './node_modules/lodash/cloneDeep.js';

// Creating shallow copy of an Object
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
