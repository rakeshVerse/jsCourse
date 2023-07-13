'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const load = document.querySelector('.load');

///////////////////////////////////////

const renderError = msg =>
  countriesContainer.insertAdjacentText(
    'beforeend',
    `An error occurred! ${msg}.`
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

// REFACTORING PROMISE CHAIN

const getCountryJSON = function (resource, errMsg) {
  return fetch(`https://restcountries.com/v3.1/${resource}`).then(res => {
    if (!res.ok) throw new Error(`${errMsg} (${res.status})`);
    return res.json();
  });
};

const getContryAndNeighbours = function (country) {
  // Ajax call 1: get country
  getCountryJSON(
    `name/${country}`,
    `Country named ${country.toUpperCase()} not found`
  )
    .then(response => {
      renderCountry(response[0]);

      // Get neighbours country code
      let neighboursCode = response[0].borders
        ? response[0].borders.join(',')
        : null;
      if (!neighboursCode)
        throw new Error(
          `${country.toUpperCase()} doesn't share border with any country`
        );

      // To generate an error, lets search for some random code
      // neighboursCode = 'asdfsde';

      // Ajax call 2: get neighbour countries using their country codes
      // prettier-ignore
      return getCountryJSON(`alpha?codes=${neighboursCode}`, 'Country with given code not found');
    })
    .then(neighbours =>
      neighbours.forEach(neighbour => renderCountry(neighbour, 'neighbour'))
    )
    .catch(err => {
      renderError(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // unhide container
      load.style.display = 'none'; // hide loader
      btn.style.display = 'none'; // hide button
    });
};

btn.addEventListener('click', function () {
  load.style.opacity = 1;
  getContryAndNeighbours('india');
  // getContryAndNeighbours('congo');
  // getContryAndNeighbours('chile');
  // getContryAndNeighbours('turkey');
  // getContryAndNeighbours('australia');
});
