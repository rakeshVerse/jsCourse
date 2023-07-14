'use strict';

// THE EVENT LOOP

// JS is single threaded. Meaning, JS Call Stack executes code sequentially in a Blocking way.
// Still JS code can be Non-blocking/Concurrent because of the Event loop.
// The Asynchronous code (Promises, Load event, Timer, etc) &  Other Event Listeners will stay
// in the Web API block until they are resolved meanwhile the normal sequence of execution will follow.
// Here, being resolved means, Occurence of an Event, resolution of Promises, etc.

// Once, resolved the Callbacks of Events will be register to Callback Queue.
// While, the Callbacks of of Promises will be register to Microtasks Queue.
// Micortasks Queue has Higher priority over Callback Queue

// Once, the Callback are registered in Microtasks & Callback Queues.
// The Event Loop comes into the picture.
// Event Loop loads the Microtasks Queue Callbacks one by one into the Call Stack for execution if the Call Stack is empty.
// After loading all the Callbacks from Microtasks Queue,
// Event loop will load Callback from Callback Queue into Call Stack one by one.

// Here, main thing to note is, the setTimer() may not fire exactly after the mentioned time.
// As, if setTimer() is set to execute after 5 seconds. So, it will stay in Web API for 5 secs.
// After that it will be sent to Callback Queue and suppose, there are 3 Callbacks already in Callback Queue
// which takes lets say 4 seconds for execution.
// So, setTimer() will take 5+4 = 9 seconds to fire instead of 5.

// Example I

// Promise will execute before setTimer() as Microtasks Queue has heigher priority
// console.log('Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolve promise').then(res => console.log(res));
// console.log('End');
/** -> 
Start
End
Resolve promise
0 sec timer
*/

// Example II
// Let's say Promise's Callback takes longer to execute, the setTimer() will have to wait till that
// Again, proving that Microtaks Queue has Heigher priority over Callback Queue
console.log('Start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolve promise').then(res => {
  for (let i = 0; i < 10 ** 10; i++) {} // simulating a task that takes longer to complete
  console.log(res);
});
console.log('End');
