'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX

// Create an XmlHttpRequest Object
// Open request with Request method & API URL
// Send the request (This is asynchronous. Once response arrives from the API XmlHttpRequest object will emmit a load event)
// Listen to load event and attach a Callback

const getContryInfo = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [country] = JSON.parse(this.response); // JSON.parse converts string/text into JS object
    const nativeNames = Object.values(country.name.nativeName);
    const languages = Object.values(country.languages).join(', ');
    const currNameKey = Object.keys(country.currencies)[0];

    const html = `
    <article class="country">
      <img class="country__img" src="${country.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${country.name.common} (${
      nativeNames.length === 1 ? nativeNames[0].common : nativeNames[1].common
    })</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${(
          country.population / 1000000
        ).toFixed(1)} Million people</p>
        <p class="country__row"><span>🗣️</span>${languages}</p>
        <p class="country__row"><span>💰</span>${
          country.currencies[currNameKey].name
        } (${country.currencies[currNameKey].symbol})</p>
      </div>
    </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getContryInfo('india');
getContryInfo('germany');
getContryInfo('portugal');
getContryInfo('italy');
getContryInfo('pakistan');
getContryInfo('russia');
getContryInfo('taiwan');
getContryInfo('vietnam');
getContryInfo('bangladesh');
getContryInfo('nepal');
getContryInfo('ukrain');
getContryInfo('spain');
getContryInfo('afghanistan');
getContryInfo('finland');
getContryInfo('poland');
getContryInfo('gb');
getContryInfo('china');
getContryInfo('sudan');
