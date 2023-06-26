/**
 * Function Methods: Call, Apply & Bind
 *
 * Manupulating 'this' keyword's context
 */

// HOTEL ORDER BOOKING EXAMPLE
const pizza = {
  dish: "Pizza",
  code: "PIZ",
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
pizza.placeOrder("John", 20); // -> John has placed an order of Pizza OrderId: PIZ20
// console.log(pizza.orders); // -> [ { orderId: 'PIZ20', firstName: 'John' } ]
pizza.placeOrder("Bob", 34); // -> Bob has placed an order of Pizza OrderId: PIZ34
// console.log(pizza.orders);
/** -> 
[
  { orderId: 'PIZ20', firstName: 'John' },
  { orderId: 'PIZ34', firstName: 'Bob' }
] 
*/

// Hotel now has added one more dish (pasta) to their menu
const pasta = {
  dish: "Pasta",
  code: "PAS",
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
// order("Mark", 12); // ERROR

// CALL METHOD
// To solve above problem, we need to explicitly tell 'this' keyword where to point to
// This can be done by calling call() on order()
// Syntax: function_name.call(tell-this-where-to-point-to, rest-of-the-comma-seperated-attributes)
// call() firsts points 'this' keyword to given reference (object) then calls the function

// place order for pasta
order.call(pasta, "Mark", 12); // 'this' now points to pasta object -> Mark has placed an order of Pasta OrderId: PAS12
// console.log(pasta.orders); // -> [ { orderId: 'PAS12', firstName: 'Mark' } ]

// place order for pizza
order.call(pizza, "Josh", 3); // -> Josh has placed an order of Pizza OrderId: PIZ3
// console.log(pizza.orders);
/** -> 
[
  { orderId: 'PIZ20', firstName: 'John' },
  { orderId: 'PIZ34', firstName: 'Bob' },
  { orderId: 'PIZ3', firstName: 'Josh' }
] 
*/

// Suppose Hotel has added one more dish to their menu
const burger = {
  dish: "Burger",
  code: "BUR",
  orders: [],
};

// That's how we can have as many dishes as we want and
// we don't have to create placeOrder() for every dish
order.call(burger, "Peter", 2); // -> Peter has placed an order of Burger OrderId: BUR2
console.log(burger.orders); // -> [ { orderId: 'BUR2', firstName: 'Peter' } ]

// APPLY METHOD
// apply() is similar to call() except it accepts two arguments:
// 1st: this pointer, and 2nd: an array of attribures
// Syntax: function.apply(tell-this-where-to-point-to, [array of arguments])

// place order using apply()
const orderArgs = ["Kevin", 22];
order.apply(pasta, orderArgs); // -> Kevin has placed an order of Pasta OrderId: PAS22
// console.log(pasta.orders);
/** -> 
 [
   { orderId: 'PAS12', firstName: 'Mark' },
   { orderId: 'PAS22', firstName: 'Kevin' }
  ]
  */

// Apply method however is not used in modern JS that much
// Because we can use Call method to achieve same by spreading arguments array

// place order using call()
const orderArgs1 = ["Martha", 43];
order.call(pasta, ...orderArgs1); // -> Martha has placed an order of Pasta OrderId: PAS43
// console.log(pasta.orders);
/** ->
[
  { orderId: 'PAS12', firstName: 'Mark' },
  { orderId: 'PAS22', firstName: 'Kevin' },
  { orderId: 'PAS43', firstName: 'Martha' }
]
 */
