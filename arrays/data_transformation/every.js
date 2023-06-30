/**
 * every() is similar to some(), but it returns true only if every element of the array satisfies the specific condition
 *
 */
const transaction = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Check if transaction contains only deposit
const onlyDeposits = transaction.every(amt => amt > 0);
// transaction contains withdraws too
console.log(onlyDeposits); // -> false

// SEPERATE CALLBACK
// Callback function can be written seperately for all the array methods that accept Callback

const withdraws = amt => amt < 0;

// Check if transactions contains only withdrawls
console.log(transaction.every(withdraws)); // -> false

// Check if transactions contains any withdrawls
console.log(transaction.some(withdraws)); // -> true

// Get all the withdrawls
console.log(transaction.filter(withdraws)); // ->  [-400, -650, -130]
