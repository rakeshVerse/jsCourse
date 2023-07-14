// BUILDING PROMISES

// To build a Promise we need to pass an Executor function to the built-in Promise Constructor.
// Executor function accepts two parameteres: resolve & reject
// We can then call resolve() or reject() based on certain condition

// Syntax:
// const newPromise = new Promise(function (resolve, reject) {});

// Example I
// Simulating Lottery
// const lotteryPromise = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     // If random number >= 0.5 then win else lose
//     if (Math.random() >= 0.5) {
//       resolve(`You WIN!!! 💰`);
//     } else {
//       reject(new Error(`You LOSE!!! 💩`));
//     }
//   }, 2000);
// });

// Consuming promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// In practice, most of the time we only Consume Promises.
// We usually only Build Promises to wrap old Callback based functions into Promises this is called as Promisifying.
// So, Promisifying is converting Callback based asynchronous behaviour into Promise based.

// Promisifying setTimeout()
const wait = function (secs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, secs * 1000);
  });
};

// Promise Chain
wait(1)
  .then(res => {
    console.log(`I waited for 1 sec`);
    return wait(1);
  })
  .then(res => {
    console.log(`I waited for 2 sec`);
    return wait(1);
  })
  .then(res => {
    console.log(`I waited for 3 sec`);
    return wait(1);
  })
  .then(res => console.log(`I waited for 4 sec`));

// Achieving same using Callback hell
setTimeout(() => {
  console.log(`I waited for 1 sec`);
  setTimeout(() => {
    console.log(`I waited for 2 sec`);
    setTimeout(() => {
      console.log(`I waited for 3 sec`);
      setTimeout(() => {
        console.log(`I waited for 4 sec`);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
