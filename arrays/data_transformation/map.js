/**
 * map() returns new array of appling an operation on all elements of original array
 *
 * Just like forEach(), map() calls a Callback function for each item by passing: current item, index and the array itself
 */

// EXAMPLE: Corrency converter USD TO INR
const currUSD = [120, 457, -99, 487, -58, -97];
const convertToINR = 82.01;

// map() calls a Callback for each item
// Callback returns currency conversion
// Each returned value pushed to a new array i.e. currINR
const currINR = currUSD.map(function (amount) {
  return amount * convertToINR;
});

console.log(currINR); // -> [9841.2, 37478.57, -8118.990000000001, 39938.87, -4756.58, -7954.97]

// ARROW FUNCTION
const currINR1 = currUSD.map(amount => amount * convertToINR);
console.log(currINR1); // -> [9841.2, 37478.57, -8118.990000000001, 39938.87, -4756.58, -7954.97]

// MAP WITH INDEX
const transactionDesc = currUSD.map(
  (amount, index) =>
    `Transaction ${index + 1}: You have ${
      amount > 0 ? 'deposited' : 'withdrew'
    } $${Math.abs(amount)}`
);
console.log(transactionDesc);
/** ->
 * ['Transaction 1: You have deposited $120', 'Transaction 2: You have deposited $457', 'Transaction 3: You have withdrew $99', 'Transaction 4: You have deposited $487', 'Transaction 5: You have withdrew $58', 'Transaction 6: You have withdrew $97']
 */
