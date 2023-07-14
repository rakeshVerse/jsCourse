'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// PROMISES
// Promises are introduced in ES6.
// When working with asynchronous code we can use Promises instead of event listeners & callbacks.
// Promises are elegant solution to handle asynchronous code.
// Instead of Callback hell (callbacks inside callbacks) using Promises we have Flat chain of Callbacks
// which makes code easier to read.

// CONSUMING PROMISES

// FETCH API
// fetch() is modern way of making AJAX calls and it returns a Promise
// On retured Promise we use then() to get Promise Settled Response(Fullfilled / Rejected)
// then() accepts a callback which returns the Promise Response in parameter.

// json()
// On Promise Response object we use json() to extract JSON Data from Promise Response body
// json() also returns a Promise that resolves when the JSON data has been extracted from
// the Promise response body and converted into a JavaScript object.
// This JavaScript object can then be used to access the data within your code.

// Syntax:
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response data
//   })
//   .catch(error => {
//     // Handle any errors
//   });

const renderCountry = country => {
  const { flags, name, region, population, languages, currencies } = country;
  const nativeNames = Object.values(name.nativeName);
  // prettier-ignore
  const { common: nativeName } = nativeNames.length > 1 ? nativeNames[1] : nativeNames[0];
  const languagesName = Object.values(languages).join(', ');
  // prettier-ignore
  const { name: currName, symbol: currSymbol } = Object.values(currencies)[0];
  const populationInMillion = (population / 1000000).toFixed(1);

  // prettier-ignore
  const html = `
  <article class="country">
    <img class="country__img" src="${flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${name.common} (${nativeName})</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${populationInMillion} Million people</p>
      <p class="country__row"><span>🗣️</span>${languagesName}</p>
      <p class="country__row"><span>💰</span>${currName} (${currSymbol})</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// AJAX using fetch()

// Using normal function
// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (response) {
//       renderCountry(...response);
//     });
// };

// Rewriting above function using arrow function
const getCountry = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(response => renderCountry(response[0]));
};

getCountry('india');
getCountry('germany');
getCountry('portugal');
getCountry('italy');
getCountry('pakistan');
getCountry('russia');
getCountry('cuba');
getCountry('ghana');
getCountry('ecuador');
getCountry('madagascar');
getCountry('mexico');
getCountry('taiwan');
getCountry('vietnam');
getCountry('bangladesh');
getCountry('macau');
getCountry('norway');
getCountry('qatar');
getCountry('oman');
getCountry('nepal');
getCountry('ukrain');
getCountry('spain');
getCountry('afghanistan');
getCountry('finland');
getCountry('poland');
getCountry('gb');
getCountry('sudan');
getCountry('greece');
getCountry('croatia');
