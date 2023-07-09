/**
 * Just like we chain methods on Arrays, we can chain methods of user defined Classes.
 *
 * For chaining, we need to return 'this' keyword form the functions we want to chain to.
 */
class Account {
  // Private properties
  #transactions = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account ${this.owner}`);
  }

  // Public interface
  deposit(amount) {
    this.#transactions.push(amount);
    return this;
  }

  // Public interface
  withdraw(amount) {
    this.deposit(-amount);
    return this;
  }

  // Public interface
  requestLoan(amount) {
    if (this.#approveLoan(amount)) {
      this.deposit(amount);
      console.log(
        `Loan Request Granted! ${this.currency} ${amount} has been deposited to your account.`
      );
      return this;
    } else console.log(`Loan Request Denied! Insufficient Balance.`);
  }

  // In case, anybody want to read protected members e.g. transactions, we can have a function in Public interface for that
  getTransactions() {
    return this.#transactions;
  }

  // Private Method
  #approveLoan(amount) {
    // amount should be 10% or less of total balance
    if (
      amount > 0 &&
      amount <= this.#transactions.reduce((acc, sum) => acc + sum, 0) * 0.1
    )
      return true;
    else return false;
  }
}

const mike = new Account('Mike', 'INR', 2222);

// Chaining Methods
mike
  .deposit(120)
  .deposit(1280)
  .deposit(156)
  .deposit(1800)
  .withdraw(500)
  .requestLoan(285);

console.log(...mike.getTransactions()); // -> 120 1280 156 1800 -500 285
