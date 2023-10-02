/**
 * Function Methods: Call, Apply & Bind
 *
 * Manupulating 'this' keyword's context
 */

// HOTEL ORDER BOOKING EXAMPLE
const pizza = {
  dish: 'Pizza',
  code: 'PIZ',
  orders: [],
  placeOrder(firstName, orderNumber) {
    // insert order details in orders array & display message
    this.orders.push({ orderId: `${this.code}${orderNumber}`, firstName });
    console.log(
      `${firstName} has placed an order of ${this.dish} OrderId: ${this.code}${orderNumber}`
    );
  },
};

// let's place few orders for pizza
pizza.placeOrder('John', 20); // -> John has placed an order of Pizza OrderId: PIZ20
// console.log(pizza.orders); // -> [ { orderId: 'PIZ20', firstName: 'John' } ]
pizza.placeOrder('Bob', 34); // -> Bob has placed an order of Pizza OrderId: PIZ34
// console.log(pizza.orders);
/** -> 
[
  { orderId: 'PIZ20', firstName: 'John' },
  { orderId: 'PIZ34', firstName: 'Bob' }
] 
*/

// Hotel now has added one more dish (pasta) to their menu
const pasta = {
  dish: 'Pasta',
  code: 'PAS',
  orders: [],
};

// We don't need to create placeOrder() again for pasta
// We can reuse placeOrder() of pizza object:

// 1. create a copy of placeOrder()
const order = pizza.placeOrder;

// 2. place order
// Calling order() like so won't work because order() is a regular function not an object method
// for order(), 'this' keyword has no context
// Regular funtion's 'this' keyword points to undefined
order('Mark', 12); // ERROR

// CALL METHOD
// To solve above problem, we need to explicitly tell 'this' keyword where to point to
// This can be done by calling call() on order()
// Syntax: function_name.call(tell-this-where-to-point-to, rest-of-the-comma-seperated-arguments)
// call() firsts points 'this' keyword to given reference (object) then calls the function

// place order for pasta
order.call(pasta, 'Mark', 12); // 'this' now points to pasta object -> Mark has placed an order of Pasta OrderId: PAS12
console.log(pasta.orders); // -> [ { orderId: 'PAS12', firstName: 'Mark' } ]

// place order for pizza
order.call(pizza, 'Josh', 3); // -> Josh has placed an order of Pizza OrderId: PIZ3
console.log(pizza.orders);
/** -> 
[
  { orderId: 'PIZ20', firstName: 'John' },
  { orderId: 'PIZ34', firstName: 'Bob' },
  { orderId: 'PIZ3', firstName: 'Josh' }
] 
*/

// Suppose Hotel has added one more dish to their menu
const burger = {
  dish: 'Burger',
  code: 'BUR',
  orders: [],
};

// That's how we can have as many dishes as we want and
// we don't have to create placeOrder() for every dish
order.call(burger, 'Peter', 2); // -> Peter has placed an order of Burger OrderId: BUR2
console.log(burger.orders); // -> [ { orderId: 'BUR2', firstName: 'Peter' } ]

// APPLY METHOD
// apply() is similar to call() except it accepts two arguments:
// 1st: this pointer, and 2nd: an array of arguments
// Syntax: function.apply(tell-this-where-to-point-to, [array of arguments])

// place order using apply()
const orderArgs = ['Kevin', 22];
order.apply(pasta, orderArgs); // -> Kevin has placed an order of Pasta OrderId: PAS22
console.log(pasta.orders);
/** -> 
 [
   { orderId: 'PAS12', firstName: 'Mark' },
   { orderId: 'PAS22', firstName: 'Kevin' }
  ]
  */

// Apply method however is not used in modern JS that much
// Because we can use Call method to achieve same by spreading arguments array
// place order using call()
const orderArgs1 = ['Martha', 43];
order.call(pasta, ...orderArgs1); // -> Martha has placed an order of Pasta OrderId: PAS43
console.log(pasta.orders);
/** ->
[
  { orderId: 'PAS12', firstName: 'Mark' },
  { orderId: 'PAS22', firstName: 'Kevin' },
  { orderId: 'PAS43', firstName: 'Martha' }
]
 */

// BIND METHOD
// Just like Call & Apply methods Bind allows us to set 'this' keyword to any function call
// The difference is, bind() doesn't immidiately calls the function
// Instead, it binds the 'this' keyword to given object & returns the function
// We can then call the returned function
// Syntax: funtion_name.bind(set-this-keyword)
const orderBurger = order.bind(burger); // binds 'this' keyword to burger object and returns placeOrder()
console.log(orderBurger); // - > [Function: bound placeOrder]
orderBurger('Amar', 15); // -> Amar has placed an order of Burger OrderId: BUR15
// OR
order.bind(burger)('Andy', 19); // -> Andy has placed an order of Burger OrderId: BUR19

// Since, bind() returns the function, we can store the returned function & then call it as many time
const orderPizza = order.bind(pizza);
const orderPasta = order.bind(pasta);

orderPizza('Aron', 20);
orderPasta('Martha', 8);
orderBurger('Chad', 4);

// PRESET FIRST ATTRIBUTE
// Example I.
// We can preset the first parameter of functions using bind()
// placing multiple orders for 'Ricky'
const orderOfRickyforBurger = order.bind(burger, 'Ricky');
// only pass 2nd arg, first arg is Preset
orderOfRickyforBurger(4); // -> Ricky has placed an order of Burger OrderId: BUR4
orderOfRickyforBurger(23); // -> Ricky has placed an order of Burger OrderId: BUR23
orderOfRickyforBurger(29); // -> Ricky has placed an order of Burger OrderId: BUR29

// Example II - PARTIAL APPLICATION
const addTAX = (rate, value) => value + value * rate;

// preset first attribure rate
// bind() to null, because in this case we don't care about 'this' keyword.
// Here, we're using bind() for presetting attribute
const addInTAX = addTAX.bind(null, 0.23);
console.log(addInTAX(123)); // -> 151.29
console.log(addInTAX(100)); // -> 123

// rewriting above example using 'function returning function' method
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const TAX = addTaxRate(0.2); // presetting rate
console.log(TAX(200)); // -> 240
console.log(TAX(20)); // -> 24

// BIND METHOD WITH HIGHER ORDER FUNCTION: AN EVENT LISTENER
pizza.plates = 800;
pizza.buyPlates = function () {
  this.plates++;
  console.log(this);
  console.log(this.plates);
};

const btn = document.querySelector('button');

// This won't work because, event listener sets 'this' to DOM object it was called on, in this case 'btn'.
// So, 'this' keywork inside 'buyPlates' points to 'btn' object
btn.addEventListener('click', pizza.buyPlates); // doesn't work

// To solve this we have to use function methods to reset 'this' keyword.
// call() or apply() won't work in this case as they will call the buyPlates() immediately.
// And we don't want that as buyPlates() is a Callback function, it should be called/trigger by event handler.
// bind() on the other hand, doesn't call the function immediately.
btn.addEventListener('click', pizza.buyPlates.bind(pizza)); // works
