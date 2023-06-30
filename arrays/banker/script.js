'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////

// Display Transactions
const displayTransactions = function (transactions, sorted = false) {
  containerMovements.innerHTML = ''; // Remove existing rows

  // Sort
  const transac = sorted
    ? transactions.slice().sort((a, b) => a - b)
    : transactions;

  // Show rows for each transaction
  transac.forEach(function (mov, i) {
    let type = mov > 0 ? 'deposit' : 'withdrawal';

    const transactionsRow = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    // Add rows
    containerMovements.insertAdjacentHTML('afterbegin', transactionsRow);
  });
};

// ////////////////////////////////

// Calculate & Print balance
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, amt) => acc + amt, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

/////////////////////////////////////////////////

// Calculate & display summary
const calcDisplaySummary = function (currAcc) {
  // income
  labelSumIn.textContent = `${currAcc.movements
    .filter(amt => amt > 0)
    .reduce((acc, amt) => acc + amt, 0)}€`;

  // outcome
  labelSumOut.textContent = `${Math.abs(
    currAcc.movements.filter(amt => amt < 0).reduce((acc, amt) => acc + amt, 0)
  )}€`;

  // interest
  // sum of each deposit * interest-rate / 100
  labelSumInterest.textContent = `${currAcc.movements
    .filter(amount => amount > 0) // deposit array
    .map(deposit => (deposit * currAcc.interestRate) / 100) // calculate interest
    .filter(interest => interest >= 1) // interest must be atleast 1
    .reduce((acc, interest) => acc + interest, 0)}€`; // interest sum
};

////////////////////////////////////

// Update UI
const updateUI = function (acc) {
  // Display balance
  calcDisplayBalance(acc);

  // Display transaction
  displayTransactions(acc.movements);

  // Display summary
  calcDisplaySummary(acc);
};

////////////////////////////////////

// Compute username (John Doe => jd)
const createUserName = accs => {
  // for each account in accountss
  accs.forEach(function (acc) {
    // create new property and store user name initials in it
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUserName(accounts);

/////////////////////////////////////////////////

// Login
let currentAccount;
const checkLogin = function (e) {
  e.preventDefault(); // prevent page reload

  // check Username & Pin
  currentAccount = accounts.find(
    accObj =>
      accObj.username === inputLoginUsername.value &&
      accObj.pin === Number(inputLoginPin.value)
  );

  if (currentAccount) {
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Show UI
    containerApp.style.opacity = 100;

    // Update UI
    updateUI(currentAccount);
  }
};

btnLogin.addEventListener('click', checkLogin);

//////////////////////////////////////

// Transfer
const transfer = function (e) {
  e.preventDefault();

  // Receive form input
  const transferAmount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(receiverAccount, transferAmount);

  // Clear fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // Validate input
  // amount must be greater than 0 and <= balance
  // receiver name should exist & receiver mustn't be current user
  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    receiverAccount &&
    receiverAccount.username !== currentAccount.username
  ) {
    // Deposite to receiver account
    receiverAccount.movements.push(transferAmount);

    // Withdraw from current account
    currentAccount.movements.push(-transferAmount);

    // Update UI
    updateUI(currentAccount);
  }
};

btnTransfer.addEventListener('click', transfer);

//////////////////////////////////////

// Request Loan
// At least one deposite with at least 10% of the Loan amount
// i.e. if Loan amount is 100 then at least one deposit shoud be 10 or greater
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // Check if request loan amount satisfies the conditoin
  if (amount > 0 && currentAccount.movements.some(amt => amt >= amount / 10)) {
    // Deposit Loan
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  // Clear fields
  inputLoanAmount.value = '';
});

/////////////////////////////////////////

// Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check if username & pin matches with current loggin user
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // Find index for given username using findIndex()
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Remove account
    accounts.splice(index, 1);

    // Hide UI & Update message
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }

  // Clear fields
  inputClosePin.value = inputCloseUsername.value = '';
});

/////////////////////////////////////

// Sort transactions
let sorted = false;
btnSort.addEventListener('click', function () {
  displayTransactions(currentAccount.movements, !sorted);
  sorted = !sorted;
});
////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
