'use strict';

const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

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
  countriesContainer.style.opacity = 1;
};

// CHAINING PROMISES
// Flat sequence of callbacks

// Getting Country and its Neighbours
// Second Ajax call is based on the data received by the First Ajax call
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
    );
};

getContryAndNeighbours('india');
// getContryAndNeighbours('australia');
// getContryAndNeighbours('brazil');
