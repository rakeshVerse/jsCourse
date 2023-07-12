'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX

// Create an XmlHttpRequest Object
// Open request with Request method & API URL
// Send the request (This is asynchronous. Once response arrives from the API .open() will emmit a load event)
// Listen to load event and attach a Callback
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/india');
request.send();
request.addEventListener('load', function () {
  const [country] = JSON.parse(this.response);
  console.log(country);

  const html = `
    <article class="country">
      <img class="country__img" src="${country.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${country.name.common} (${
    country.name.nativeName.hin.common
  })</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${(
          country.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${country.languages.hin}</p>
        <p class="country__row"><span>💰</span>${
          country.currencies.INR.name
        } (${country.currencies.INR.symbol})</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
});

countriesContainer.style.opacity = 1;
