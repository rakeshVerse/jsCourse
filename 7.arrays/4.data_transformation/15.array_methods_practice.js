const accounts = [
  {
    owner: 'John Doe',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: 'Thomas Lee',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: 'Steven Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

// Exercise I. How much has been deposited in total in the bank
// Solution:
// 1. map all movements array from all the accounts into a single array [[],[],[],[]] & flaten it []
// 2. filter to get only deposit from flatened array
// 3. calculate sum of all the deposit amount
const totalDepositBalance = accounts
  .flatMap(acc => acc.movements)
  .filter(amt => amt > 0)
  .reduce((sum, amt) => sum + amt, 0);
console.log(totalDepositBalance); // -> 25180

// Exercise II. How many deposits there have been in the bank with at least 1000 USD
// Solution I:
// get all transactions in one array
// filter by deposite at least 1K
// get the length of the array
const numDepositOverOneK = accounts
  .flatMap(acc => acc.movements)
  .filter(amt => amt >= 1000).length;
console.log(numDepositOverOneK); // -> 6

// Solution II:
// get all transactions in one array
// reduce to get the length of array
const numDeposit = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, deposit) => (deposit >= 1000 ? count + 1 : count), 0);
console.log(numDeposit); // -> 6

// Example III. Create an object that contains the sum of the deposits and the withdrawls
// [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
const { deposits, withdrawls } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, amt) => {
      // 2 ways
      // 1. with ternary operator
      // amt > 0 ? (sum.deposits += amt) : (sum.withdrawls += amt);

      // 2. computing inside the square bracket
      sum[amt > 0 ? 'deposits' : 'withdrawls'] += amt;
      return sum;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log({ deposits, withdrawls }); // -> {deposits: 25180, withdrawls: -7340}

// CHALLENGE: SOLVE EXAMPLE 1, 2 & 3 USING reduce() only

// Example IV. Create a function to convert any string ot a title case e.g. 'this is a nice title' -> 'This Is a Nice Title'
// Solution:
// 1. lower case the string
// 2. split the string into individual words
// 3. create a new array using map() that contains capitalized words
// 3.1. if word exists in exception array then return word else return capitalized word
// 4. join the array
const convertTitleCase = function (title) {
  // capitalize function
  const capitalize = str => str.replace(str[0], str[0].toUpperCase());

  // Don't capitalize these words
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  // in 3rd call the string starts with 'and' which is an exception, but we don't want our title to begin with Lower case
  // so capitalize the final titleCase
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title')); // -> This Is a Nice Title
console.log(convertTitleCase('this is a LONG title but not too long')); // -> This Is a Long Title but Not Too Long
console.log(convertTitleCase('and here is another title with an EXAMPLE')); // -> And Here Is Another Title with an Example
