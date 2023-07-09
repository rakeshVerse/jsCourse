/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed; // speed in km/h
  }

  // Instance Methods
  accelerate() {
    this.speed += 10;
    console.log(`New accelerated speed of ${this.make}: ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make}'s decreased speed after applying brakes: ${this.speed}km/h`
    );
  }

  get speedUS() {
    return `Current speed in mi/h: ${this.speed / 1.6}`;
  }

  set speedUS(speed) {
    // Convert given speed to km/h
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
ford.speedUS = 75; // speed in mi/h
console.log(ford.speed); // -> 120
ford.accelerate();
ford.brake();
