/**
 * JS now supports ENCAPSULATION using new Class Fields
 *
 * Private properties: To make properties private put '#' in front of them outside the constructor
 *
 * Private methods: To make methods private put '#' in front of them
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
  }

  // Public interface
  withdraw(amount) {
    this.deposit(-amount);
  }

  // Public interface
  requestLoan(amount) {
    if (this.#approveLoan(amount)) {
      this.deposit(amount);
      console.log(
        `Loan Request Granted! ${this.currency} ${amount} has been deposited to your account.`
      );
    } else console.log(`Loan Request Denied! Insufficient Balance.`);
  }

  // In case, anybody want to read protected members e.g. transactions, we can have a function in Public interface for that
  getTransactions() {
    console.log(this.__proto__);
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
console.log(mike.__proto__);
mike.deposit(120);
mike.deposit(1280);
mike.deposit(156);
mike.deposit(1800);
mike.withdraw(500);
mike.requestLoan(285);

console.log(...mike.getTransactions()); // -> 120 1280 156 1800 -500 285

// console.log(mike.#transactions); // -> Private field '#transactions' must be declared in an enclosing class
// console.log(mike.#approveLoan(250)); // -> Private field '#approveLoan' must be declared in an enclosing class
