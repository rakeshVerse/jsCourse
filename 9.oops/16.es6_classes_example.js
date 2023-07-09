class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.transactions = [];

    console.log(`Thanks for opening an account ${this.owner}`);
  }

  // Public interface
  deposit(amount) {
    this.transactions.push(amount);
  }

  // Public interface
  withdraw(amount) {
    this.deposit(-amount);
  }

  // Internal Method
  approveLoan(amount) {
    // amount should be 10% or less of total balance
    if (
      amount > 0 &&
      amount <= this.transactions.reduce((acc, sum) => acc + sum, 0) * 0.1
    )
      return true;
    else return false;
  }

  // Public interface
  requestLoan(amount) {
    if (this.approveLoan(amount)) {
      this.deposit(amount);
      console.log(
        `Loan Request Granted! ${this.currency} ${amount} has been deposited to your account.`
      );
    } else console.log(`Loan Request Denied! Insufficient Balance.`);
  }
}

const mike = new Account('Mike', 'INR', 2222);
console.log(mike); // -> Account {owner: 'Mike', currency: 'INR', pin: 2222, transactions: Array(0)}

mike.deposit(120);
mike.deposit(1280);
mike.deposit(156);
mike.deposit(1800);
mike.withdraw(500);

console.log(mike);
/** -> 
Account {
  owner: 'Mike',
  currency: 'INR',
  pin: 2222,
  transactions: [ 120, 128, 156, 1800, -500 ]
} 
*/

mike.requestLoan(122000); // -> Loan Request Denied! Insufficient Balance.
mike.requestLoan(300); // -> Loan Request Denied! Insufficient Balance.
mike.requestLoan(290); // -> Loan Request Denied! Insufficient Balance.
mike.requestLoan(285); // -> Loan Request Granted! INR 285 has been deposited to your account.

console.log(mike);
/** -> 
Account {
  owner: 'Mike',
  currency: 'INR',
  pin: 2222,
  transactions: [ 120, 1280, 156, 1800, -500, 285 ]
} 
*/

// ENCAPSULATION
// Need of DATA PRIVACY
// In above example, we can access all the data properties on objects.
// Also, we can access approveLoan() method which is an internal function and shouldn't be available in Public API.
// To solve this problem we need to ENCAPSULATE our methods & properties.
