/**
 * some() loops over given array and for each item calls a Callback
 *
 * It returns true or false based on given condition
 */
const transaction = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Using includes
console.log(transaction.includes(450)); // -> true

// Check if array has any element that's greater than 0 (i.e. if array has any deposits)
// In such case, we can't use includes() as it checks for equality
// For checking a condition we have to use some()
const anyDeposit = transaction.some(amt => amt > 0);
console.log(anyDeposit); // -> true
