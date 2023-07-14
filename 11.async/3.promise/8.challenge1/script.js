'use strict';

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data.
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

*/
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

// Reverse geocoding: Get position details using co-ordinates
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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

btn.addEventListener('click', function () {
  countriesContainer.textContent = '';
  position.textContent = '';
  load.style.display = 'contents';

  // whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  // whereAmI(-33.933, 18.474);
});
