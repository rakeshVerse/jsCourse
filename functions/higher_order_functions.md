## Higher Order Functions

Since, functions are simply objects in JavaScript, a function can

- receive another functions as argument
- return a new function

Such functions are called as **Higher Order Functions**

I. Receive another function as an argument.

In below example,Event Listener is a **Higher Order Function** and great() is a **Callback function**

```js
const greet = () => alert("Welcome!!!");
document.querySelector("button").addEventListener("click", greet);
```

II. Return a new function.

Below, count() is a **Higher Order Function** which returns a function.

```js
function count() {
  let count = 0;
  return function () {
    count++;
  };
}
```
