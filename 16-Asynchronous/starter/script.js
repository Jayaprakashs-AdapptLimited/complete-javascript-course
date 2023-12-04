'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderData = (data, className = '') => {
    console.log(data);
    // console.log(data.name.common);
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common} </h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${Number(
        data.population / 1000000
      ).toFixed(1)}M</p>
      <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
      <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX CALL COUNTRY - 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    console.log(Number(data.population / 1000000).toFixed(1));
    console.log(data.languages.por);
    console.log(data.currencies.EUR.name);

    // GET COUNTRY - 1
    renderData(data);

    console.log(data.borders?.[0]);
    // GET NEIGHBOURING COUNTRY
    // const [borders] = data.borders;
    // console.log(borders);
    const neighbourCountry = data.borders?.[0];
    console.log(neighbourCountry);

    // AJAX CALL COUNTRY -2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    request2.send();

    // console.log(request2.responseText);

    request2.addEventListener('load', function() {
        // console.log(this.responseText);
        const [data2] = JSON.parse(this.response);
        console.log(data2); 
        renderData(data2, 'neighbour');
    })

  });
};

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('eesti');
// getCountryData('germany');
// getCountryData('eesti');


//////////////////////
// PROMISE
const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

const getCountryData = (country) => {
    console.log(fetch(`https://restcountries.com/v3.1/name/${country}`).then((response) => {
        console.log(response);
        // console.log(response.json());
        return response.json();
    }).then((data) => console.log(data)));
}

getCountryData('portugal');