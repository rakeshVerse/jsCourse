'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const load = document.querySelector('.load');
const position = document.getElementById('pos');

///////////////////////////////////////

// ASYNC AWAIT
// Async...Await is introduced in ES2017. It is better way of Consuming Promises.
// However, it's just Syntatic Sugar over the then() method
// Async functions always retruns a Promise

// prettier-ignore
const renderError = msg => countriesContainer.insertAdjacentText('beforeend', `An error occurred! ${msg}`);

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

// Get user's co-ordinates
const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Wrapping code in try...catch for error handling
  // All the rejected promises will be caught by catch block
  // For some error that are not rejected by promise, we need to throw them manually using 'throw new Error()'
  // thrown error will reject the promise chain and send control to catch block
  try {
    countriesContainer.textContent = '';
    position.textContent = '';
    load.style.display = 'contents';

    // Get coords
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocode
    const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`); // Make async API call and store response
    const geoJson = await geoRes.json(); // convert API respose into a json object
    const { city, country } = geoJson;

    // If limit exceeded throw error
    if (city === 'Throttled! See geocode.xyz/pricing')
      throw new Error('Limit Exceeded!');

    position.textContent = `You are in ${city}, ${country}`;

    // Get country using name
    const countryRes = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!countryRes.ok)
      throw new Error(`Country with name '${country}' not Found!`);

    const countryJson = (await countryRes.json())[0];
    renderCountry(countryJson);

    // prettier-ignore
    const neighboursCodes = countryJson.borders ? countryJson.borders.join(',') : null;
    if (!neighboursCodes)
      throw new Error(
        `${country.toUpperCase()} doesn't have any neighbouring country.`
      );

    // Get Neighbouring contries using their codes
    const neighboursRes = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${neighboursCodes}`
    );

    if (!neighboursRes.ok)
      throw new Error(`Could not load neighbouring countires!`);

    const neighboursJson = await neighboursRes.json();
    neighboursJson.forEach(neighbour => renderCountry(neighbour, 'neighbour'));

    // returning value from Async function which can be counsumed using then() & catch()
    return `You are in ${city}, ${country}`;
  } catch (err) {
    renderError(err.message);

    // Reject promise returned from Async function whereAmI
    throw err;
  }
};

// CONSUMING ASYNC FUNCTION
// There are 3 ways of consuming Async function whereAmI()

// 1.
// Calling Async function Normally on button click
btn.addEventListener('click', whereAmI);

// 2.
// Consuming Promise returned by Async function using old way [then(), catch(), finally()]
// Problem with this way is, we are mixing new Async/Await with old way of consuming Promises
btn.addEventListener('click', function () {
  console.log(`1. Will get your location.`);
  whereAmI()
    .then(res => console.log(`2. ${res}`))
    .catch(err => console.error(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
      load.style.display = 'none';
      console.log(`3. Finished getting location`);
    });
});

// 3.
// To fix above problem we use another Async function to consume Promise returned by WhereAmI
// To execute the below Async function automatically we can use IIFE
// This way we are only using new Async/Await feature to consume Promise returned by an Async Function
(async function () {
  try {
    const pos = await whereAmI();
    console.log(pos);
  } catch (err) {
    console.error(err.message);
  }

  // Execute this code regarless of whether Promise resolves to fulfilled or rejected (Simulates finally())
  countriesContainer.style.opacity = 1;
  load.style.display = 'none';
})();
