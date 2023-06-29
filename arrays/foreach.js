const transaction = [120, 457, -99, 487, -58, -97];

// Looping through transaction array

// Using for..of
for (const amount of transaction) {
  if (amount > 0) console.log(`You have deposited: ${amount}`);
  else console.log(`You have withdrew: ${Math.abs(amount)}`);
}

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

/**
 * Note: We can not use break or continue with forEach
 */
