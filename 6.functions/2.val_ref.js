/**
 * Primitives vs Objects (reference types)
 */

// primitive: str & newStr are two seperate variables. Changing one won't affect other
const str = "hello";
const newStr = str;

// object (reference type): obj & newObj refer to same object. Changing one will affect other
const obj = {
  name: "Arjun Sharma",
};
const newObj = obj;
newObj.name = "Rakesh Sharma";
console.log(obj); // -> {name: 'Rakesh Sharma'}

// Example:
const flight = "AC11";
const john = {
  name: "John Doe",
  passport: 343343423323,
};

const checkIn = (flightNum, passenger) => {
  flightNum = "B534"; // mutating primitive
  passenger.name = "Mr." + passenger.name; // mutating reference type

  passenger.passport === 343343423323
    ? console.log(`Checked In`)
    : console.log(`Wrong passport!`);
};

checkIn(flight, john); // -> Checked In
console.log(flight); // mutation didn't affect -> AC11
console.log(john); // nutation reflected to john object -> {name: 'Mr.John Doe', passport: 343343423323}

// Effect of object mutation
const newPassport = (person) => {
  person.passport = Math.trunc(Math.random() * 100000);
};

newPassport(john); // john.passport has been changed
checkIn(flight, john); // -> Wrong passport!

/**
 * Note:
 * JavaScript have only 'pass by value', it doesn't have 'pass by reference'.
 * Even though when we pass an object to a function the memory address of
 * the object get passed not the object itself. But it's still 'pass by value'.
 * Because, we are simply passing memory address as a value not as reference.
 * Hence, in JS we pass reference 'to' a function but we do not pass 'by' a reference.
 */
