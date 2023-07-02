## First class functions

JavaScript treats functions as first-class citizen, meaning funtions in JavaScript are simply values. Functions are just another type of objects.

Since, functions are objects we can

- store them in variables or objects
- pass them as arguments to other functions.
- return functions from functions
- call methods on functions

Store function in variables or objects

```js
// store function in a variable
const sum = (a, b) => a + b;

// store function in object
const person = {
  name: "John Doe",
  calcAge: function (birthYear) {
    return 2023 - birthYear;
  },
};
```

Pass a function as an argument to another function

```js
// function greet is passed to event listener as an argument
const greet = () => alert("Welcome!!!");
document.querySelector("button").addEventListener("click", greet);
```

Return a function from a function

```js
function count() {
  let count = 0;
  return function () {
    count++;
  };
}
```

Call a method on a function

```js
person.calcAge.bind(someOtherObject);
```
