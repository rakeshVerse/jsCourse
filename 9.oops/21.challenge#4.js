/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

*/

// Car
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`New accelerated speed of ${this.make}: ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make}'s decreased speed after applying brakes: ${this.speed}km/h`
    );
    return this;
  }
}

// EV
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    --this.#charge;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const tesla = new EVCl('Tesla', 120, 23);
console.log(tesla); // -> EVCl {make: 'Tesla', speed: 120}
tesla.accelerate(); // -> Tesla going at 140 km/h, with a charge of 22%
tesla.brake(); // -> Tesla's decreased speed after applying brakes: 135km/h
tesla.chargeBattery(90);

tesla.accelerate(); // -> Tesla going at 155 km/h, with a charge of 89%
tesla.brake(); // -> Tesla's decreased speed after applying brakes: 150km/h

// Chaining methods
const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().brake().chargeBattery(82).accelerate().brake();
/** -> 
Rivian going at 140 km/h, with a charge of 22%
Rivian's decreased speed after applying brakes: 135km/h
Rivian going at 155 km/h, with a charge of 81%
Rivian's decreased speed after applying brakes: 150km/h
*/
