/**
 * ENCAPSULATION & DATA PRIVACY
 *
 * We need to make some of our class data private so that it can't be accesible outside the class.
 * Only the public interfaces/APIs should be allowed to access outside the class.
 *
 * Also, when our internal members are private we can modify them with confidence without breaking the public interfaces.
 *
 * However, JS classed doesn't yet support real ENCAPSULATION & DATA PRIVACY.
 *
 * We can fake Privacy by using a convention: Putting underscore (_) in front of the class members whom we want to make private.
 * It ofcourse, doesn't do anything, we can still access the members but using this convention will let the other developers
 * know that these members shouldn't be manipulate from outside the class.
 *
 */
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Protected properties
    this._pin = pin;
    this._transactions = [];

    console.log(`Thanks for opening an account ${this.owner}`);
  }

  // Public interface
  deposit(amount) {
    this._transactions.push(amount);
  }

  // Public interface
  withdraw(amount) {
    this.deposit(-amount);
  }

  // Protected Method
  _approveLoan(amount) {
    // amount should be 10% or less of total balance
    if (
      amount > 0 &&
      amount <= this._transactions.reduce((acc, sum) => acc + sum, 0) * 0.1
    )
      return true;
    else return false;
  }

  // Public interface
  requestLoan(amount) {
    if (this._approveLoan(amount)) {
      this.deposit(amount);
      console.log(
        `Loan Request Granted! ${this.currency} ${amount} has been deposited to your account.`
      );
    } else console.log(`Loan Request Denied! Insufficient Balance.`);
  }

  // In case, anybody want to read protected members e.g. transactions, we can have a function in Public interface for that
  getTransactions() {
    return this._transactions;
  }
}

const mike = new Account('Mike', 'INR', 2222);

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
  _pin: 2222,
  _transactions: [ 120, 1280, 156, 1800, -500 ]
} 
*/

console.log(...mike.getTransactions()); // -> 120 1280 156 1800 -500
