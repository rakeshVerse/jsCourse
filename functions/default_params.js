// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = { flightNum, numPassengers, price };
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000); // skkiping param

console.log(bookings); /** ->
[
  { flightNum: 'LH123', numPassengers: 1, price: 199 },
  { flightNum: 'LH123', numPassengers: 2, price: 800 },
  { flightNum: 'LH123', numPassengers: 2, price: 398 },
  { flightNum: 'LH123', numPassengers: 5, price: 995 },
  { flightNum: 'LH123', numPassengers: 1, price: 1000 }
]
*/
