'use strict';

const btn = document.querySelector('.btn-country');
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

// CHAINING PROMISES
// Flat sequence of callbacks

// Getting Country and its Neighbours
const getContryAndNeighbours = function (country) {};

getContryAndNeighbours('india');
// getContryAndNeighbours('brazil');
