'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// CALLBACK HELL: Callback inside Callback

const renderCountry = (country, className = '') => {
  const nativeNames = Object.values(country.name.nativeName);
  // prettier-ignore
  const languages = Object.values(country.languages).map(lan => lan).join(', ');
  const [curr] = Object.values(country.currencies);

  // prettier-ignore
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${country.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${country.name.common} (${nativeNames.length === 1 ? nativeNames[0].common : nativeNames[1].common})</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(+country.population / 1000000).toFixed(1)} Million people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${curr.name} (${curr.symbol})</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// AJAX
const ajaxCall = function (resource) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/${resource}`);
  request.send();
  return request;
};

// Getting Neighbours of the Country
// Ajax sequence: Making an Ajax call inside the callback of an Ajax call
const getContryAndNeighbours = function (country) {
  // Ajax call 1
  ajaxCall(`name/${country}`).addEventListener('load', function () {
    const [country] = JSON.parse(this.response);
    renderCountry(country);

    // Get neighbours
    const neighbour = country.borders ? country.borders : null;
    if (!neighbour) return;

    // Ajax call 2
    // prettier-ignore
    ajaxCall(`alpha?codes=${neighbour.join(',')}`).addEventListener('load', function () {
      const countries = JSON.parse(this.response);
      countries.forEach(country => renderCountry(country, 'neighbour'));
    });
  });
};

// getContryAndNeighbours('india');
getContryAndNeighbours('brazil');
