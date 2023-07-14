'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const load = document.querySelector('.load');
const position = document.getElementById('pos');

///////////////////////////////////////

// prettier-ignore
const renderError =  (msg) =>
  countriesContainer.insertAdjacentText('beforeend',`An error occurred! ${msg}`)

const renderCountry = (country, className = '') => {
  const { flags, name, region, population, languages, currencies } = country;
  const populationInMillion = (population / 1000000).toFixed(1);
  const nativeNames = Object.values(name.nativeName);
  const nativeName =
    nativeNames.length > 1 ? nativeNames[1].common : nativeNames[0].common;
  const { name: currName, symbol: currSymbol } = Object.values(currencies)[0];
  const spokenLangs = Object.values(languages).join(', ');

  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${name.common} (${nativeName})</h3>
    <h4 class="country__region">${region}</h4>
    <p class="country__row"><span>👫</span>${populationInMillion} Million people</p>
    <p class="country__row"><span>🗣️</span>${spokenLangs}</p>
    <p class="country__row"><span>💰</span>${currName} (${currSymbol})</p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// Make an Ajax call to get provided country's details & return JSON
const getCountryJSON = function (resource, errMsg) {
  return fetch(`https://restcountries.com/v3.1/${resource}`).then(res => {
    if (!res.ok) throw new Error(`${errMsg} (Status: ${res.status}).`);
    return res.json();
  });
};

// Get country & its neighbours and display them
const getCountryAndNeighbours = country => {
  // prettier-ignore
  return getCountryJSON(`name/${country}`, `Country with name '${country}' not found`)
    .then(res => {
      // Display contry
      renderCountry(res[0]);

      // Get country's neighbours codes
      // prettier-ignore
      const neighboursCodes = res[0].borders ? res[0].borders.join(',') : null;
      if (!neighboursCodes)
        throw new Error(
          `${country.toUpperCase()} doesn't have any neighbouring country.`
        );

      // Get neighbour countries using their country code
      // prettier-ignore
      return getCountryJSON(`alpha?codes=${neighboursCodes}`,`Could not find neighbouring countries`);
    })
    .then(neighbours =>
      neighbours.forEach(neighbour => renderCountry(neighbour, 'neighbour'))
    );
};

// PROMISIFYING
const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Reverse geocoding: Get position details using co-ordinates
const whereAmI = function (lat, lng) {
  countriesContainer.textContent = '';
  position.textContent = '';
  load.style.display = 'contents';

  // Consuming user built Promise
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => res.json())
    .then(geoData => {
      const { city, country } = geoData;

      // If limit exceeded throw error
      if (city === 'Throttled! See geocode.xyz/pricing')
        throw new Error('Limit Exceeded!');

      position.textContent = `You are in ${city}, ${country}`;

      // Get country and its neighbours
      return getCountryAndNeighbours(country);
    })
    .catch(err => renderError(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
      load.style.display = 'none';
    });
};

btn.addEventListener('click', whereAmI);
