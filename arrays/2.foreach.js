const transaction = [120, 457, -99, 487, -58, -97];

// Looping through transaction array

// Using for..of
for (const amount of transaction) {
  if (amount > 0) console.log(`You have deposited: ${amount}`);
  else console.log(`You have withdrew: ${Math.abs(amount)}`);
}
/** -> 
You have deposited: 120
You have deposited: 457
You have withdrew: 99
You have deposited: 487
You have withdrew: 58
You have withdrew: 97 
*/

// Using forEach
// forEach is a higher-order function which accepts a Callback function as argument.
// For each item of array, it calls the Callback function like so
/**
 * 1st iteration: function (120)
 * 2nd iteration: function (457)
 *     .
 *     .
 * last iteration: function (-97)
 */
transaction.forEach(function (amount) {
  if (amount > 0) console.log(`You have deposited: ${amount}`);
  else console.log(`You have withdrew: ${Math.abs(amount)}`);
});
/** -> 
You have deposited: 120
You have deposited: 457
You have withdrew: 99
You have deposited: 487
You have withdrew: 58
You have withdrew: 97 
*/

// GET INDEX using forEach
// Callback function accepts: item, index and entire array in this particular order only like so
// function(item, index, array)
transaction.forEach(function (amount, index, arr) {
  if (amount > 0)
    console.log(`Transaction ${index + 1}: You have deposited: $${amount}`);
  else
    console.log(
      `Transaction ${index + 1}: You have withdrew: $${Math.abs(amount)}`
    );
});
/** -> 
Transaction 1: You have deposited: $120
Transaction 2: You have deposited: $457
Transaction 3: You have withdrew: $99
Transaction 4: You have deposited: $487
Transaction 5: You have withdrew: $58
Transaction 6: You have withdrew: $97 
*/

// Note: We can not use break or continue with forEach

// MAPS
const currency = new Map([
  ['INR', 'Indian Rupees'],
  ['USD', 'United States Dollars'],
  ['GBP', 'Great Britain Pound'],
]);

// Callback accepts value, key & map in this order
currency.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
/** -> 
INR: Indian Rupees
USD: United States Dollars
GBP: Great Britain Pound 
*/

// SETS
const uniqueCurrency = new Set(['INR', 'USD', 'INR', 'GBP', 'GBP']);

// 'value' and 'key' are SAME since, Sets don't have indices
uniqueCurrency.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
/** ->
INR: INR
USD: USD
GBP: GBP 
*/
