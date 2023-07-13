'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const load = document.querySelector('.load');

///////////////////////////////////////

const renderError = msg =>
  countriesContainer.insertAdjacentText(
    'beforeend',
    `Something went wrong: ${msg} Please check your internet connection and try again!`
  );

const renderCountry = (country, className = '') => {
  const { flags, name, region, population, languages, currencies } = country;
  const nativeNames = Object.values(name.nativeName);
  // prettier-ignore
  const { common: nativeName } = nativeNames.length > 1 ? nativeNames[1] : nativeNames[0];
  const languagesName = Object.values(languages).join(', ');
  // prettier-ignore
  const { name: currName, symbol: currSymbol } = Object.values(currencies)[0];
  const populationInMillion = (population / 1000000).toFixed(1);

  const html = `
  <article class="country ${className}">
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
};

// REJECTED PROMISES

// Errors can occure when making Ajax calls
// On user end, user may lose the internet connnection
// While on server end, Server may return an error in case, e.g. requested data not found or server is down, etc.

// Suppose user loses internet connection, we can handle such condition:
// 1. By passing one more callback to then(). So, the first callback of then is for fullfilled & second is for rejected response.
// But we will have to attach a callback to each then()
// 2. The better way to catch the error at the end of the promise chain. catch() will look for any error that occured in the
// entire promise chain.

// finally()
// It only works on promises, catch() returns a Promise so we can attach finally() on the returned Promise
// finally() block executes regardless of whether Promise resolves to Fullfilled or Rejected
// This can be useful in e.g. showing/hiding elements

const getContryAndNeighbours = function (country) {
  // Ajax call 1: get country
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(res => {
      renderCountry(res[0]);

      // Get neighbours country code
      const neighboursCode = res[0].borders ? res[0].borders.join(',') : null;
      if (!neighboursCode) return;

      // Ajax call 2: get neighbour countries using their country codes
      // prettier-ignore
      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighboursCode}`);
    })
    .then(res => (res ? res.json() : []))
    .then(neighbours =>
      neighbours.forEach(neighbour => renderCountry(neighbour, 'neighbour'))
    )
    .catch(err => {
      console.log(err.message); // -> NetworkError when attempting to fetch resource.

      renderError(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // unhide container
      load.style.opacity = 0; // hide loader
    });
};

btn.addEventListener('click', function () {
  load.style.opacity = 1;
  getContryAndNeighbours('india');
  // getContryAndNeighbours('australia');
  // getContryAndNeighbours('brazil');
});
