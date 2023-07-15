'use strict';

// RUNNING PROMISES IN PARALLEL

// Whenever you have a situation in which you have to do multiple Async operation at the same thime
// and these operations are not dependent on one another
// then you should always run them in PARALLEL using PROMISE COMBINATOR: Promise.all([array_of_promises])
// Promise.all() will run all the promises provinded in parameter Array in Parallel

// prettier-ignore
const getJSON = resource =>
  fetch(`https://restcountries.com/v3.1/name/${resource}`).then(res =>res.json());

// I. Sequential Promises Example: Get 3 countries and log an array of their capitals
const get3CountriesSquentially = async function (c1, c2, c3) {
  // All three promises will execute in sequence/blocking-way one after another
  const [country1] = await getJSON(c1);
  const [country2] = await getJSON(c2);
  const [country3] = await getJSON(c3);

  console.log([country1.capital[0], country2.capital[0], country3.capital[0]]); // -> Array(3) [ "New Delhi", "Washington, D.C.", "Tokyo" ]
};
get3CountriesSquentially('india', 'usa', 'japan');

// II. PARALLEL Promises Example: Get 3 countries and log an array of their capitals
const get3CountriesParallelly = async function (c1, c2, c3) {
  // Promise.all() will run all three promises parallelly
  // Note: If one promise is rejected all the promises will be rejected.
  // Meaning, Promise.all() shortcircuits whenever one promise is rejected
  const countries = await Promise.all([getJSON(c1), getJSON(c2), getJSON(c3)]);
  console.log(countries.map(country => country[0].capital[0])); // -> Array(3) [ "New Delhi", "Washington, D.C.", "Tokyo" ]
};
get3CountriesParallelly('india', 'usa', 'japan');

// OTHER THREE PROMISE COMBINATORS
// Besides Promise.all(), there are three more Combinations:

// 1. Promise.race()
// Will return the SETTELED (fulfilled or rejected) value of the fastest returned Promise
// Just like .all(), .race() accepts an array of Promises, and executes them parallelly
(function () {
  Promise.race([getJSON('india'), getJSON('usa'), getJSON('japan')])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));
})();

// Promise.race() is very useful in practical life e.g. To tell user that resource taking too long
const timer = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Resource is taking too long...`));
    }, sec * 1000);
  });
};

// If the first Promise passed to parameter array of .race() doesn't resolves in 2 seconds then
// the timer() will be returned as the resolved value of.race()
// And throw an Error: Resource is taking too long...
Promise.race([getJSON('india'), timer(2)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// 2. Promise.allSettled
// It was introduced in ES2020
// It is similar to Promise.all() exepts
// it will return all the SETTELD (fulfilled or rejected) Promises.
// While Promise.all() shortcircuits when any one Promise is rejected.
Promise.allSettled([
  Promise.resolve(`Promise 1 resolved`),
  Promise.reject(new Error(`Promise 2 rejected`)),
  Promise.resolve(`Promise 2 resolved`),
]).then(res => console.log(res));
/** -> 
Array(3) [ {…}, {…}, {…} ]
0: Object { status: "fulfilled", value: "Promise 1 resolved" }
1: Object { status: "rejected", reason: Error }
2: Object { status: "fulfilled", value: "Promise 2 resolved" } 
*/

// VS. Promise.all()
Promise.all([
  Promise.resolve(`Promise 1 resolved`),
  Promise.reject(new Error(`Promise 2 rejected`)),
  Promise.resolve(`Promise 2 resolved`),
])
  .then(res => console.log(res))
  .catch(err => console.error(err)); // -> Error: Promise 2 rejected

// 3. Promise.any()
// It was introduced in ES2021
// It will return the FIRST fulfilled Promise
// In case all the Promises are rejected the it returns following error: AggregateError: No Promise in Promise.any was resolved
Promise.any([
  Promise.reject(new Error(`Promise 1 rejected`)),
  Promise.reject(new Error(`Promise 2 rejected`)),
  Promise.resolve(`Promise 3 resolved`),
  Promise.resolve(`Promise 4 resolved`),
  Promise.reject(new Error(`Promise 5 rejected`)),
]).then(res => console.log(res)); // Promise 3 is the first fulfilled Promise -> Promise 3 resolved

// Note: Out of all the four combinators Promise.all() & Promise.race() are the most important ones
