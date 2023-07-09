/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

*/

// Car
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New accelerated speed of ${this.make}: ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(
    `${this.make}'s decreased speed after applying brakes: ${this.speed}km/h`
  );
};

// EV
/**
 *
 * @param {string} make Brand
 * @param {number} speed Speed in km/h
 * @param {number} charge Current battery charge in %
 */
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Inheritance
EV.prototype = Object.create(Car.prototype);

// EV protoype  methods
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  --this.charge;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla); // -> EV {make: 'Tesla', speed: 120, charge: 23}
tesla.accelerate(); // -> Tesla going at 140 km/h, with a charge of 22%
tesla.brake(); // -> Tesla's decreased speed after applying brakes: 135km/h
tesla.chargeBattery(90);

tesla.accelerate(); // -> Tesla going at 155 km/h, with a charge of 89%
tesla.brake(); // -> Tesla's decreased speed after applying brakes: 150km/h

// Prototype chain
console.log(tesla.__proto__); // -> Car {chargeBattery: ƒ, accelerate: ƒ}
console.log(tesla.__proto__.__proto__); // -> {accelerate: ƒ, brake: ƒ, constructor: ƒ}
console.log(tesla.__proto__.__proto__.__proto__); // Object
console.log(tesla.__proto__.__proto__.__proto__.__proto__); // -> null
