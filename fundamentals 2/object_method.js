const rock = {
  firstName: "rock",
  lastName: "smith",
  birthYear: 1991,
  job: "software engineer",
  friends: ["mark", "john", "logan"],
  hasDriversLicense: true,
  calcAge: function () {
    this.age = 2037 - this.birthYear;
  },
};

rock.calcAge();
console.log(rock);
