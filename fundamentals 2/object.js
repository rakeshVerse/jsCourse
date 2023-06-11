const rock = {
  firstName: "rock",
  lastName: "smith",
  age: 2037 - 1991,
  job: "software engineer",
  friends: ["mark", "john", "logan"],
};

const property = prompt("enter rock property");
if (rock[property]) console.log(rock[property]);
else console.log(`wrong property`);
