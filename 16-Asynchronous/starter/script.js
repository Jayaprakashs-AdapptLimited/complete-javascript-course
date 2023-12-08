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

const renderError = message => {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX CALL COUNTRY - 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     console.log(Number(data.population / 1000000).toFixed(1));
//     console.log(data.languages.por);
//     console.log(data.currencies.EUR.name);

//     // GET COUNTRY - 1
//     renderData(data);

//     console.log(data.borders?.[0]);
//     // GET NEIGHBOURING COUNTRY
//     // const [borders] = data.borders;
//     // console.log(borders);
//     const neighbourCountry = data.borders?.[0];
//     console.log(neighbourCountry);

//     // AJAX CALL COUNTRY -2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
//     );
//     request2.send();

//     // console.log(request2.responseText);

//     request2.addEventListener('load', function () {
//       // console.log(this.responseText);
//       const [data2] = JSON.parse(this.response);
//       console.log(data2);
//       renderData(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('eesti');
// getCountryData('germany');
// getCountryData('eesti');

//////////////////////
// PROMISE
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = (country) => {
//     console.log(fetch(`https://restcountries.com/v3.1/name/${country}`).then((response) => {
//         console.log(response);
//         // console.log(response.json());
//         return response.json();
//     }).then((data) => console.log(data)));
// }

// getCountryData('portugal');

///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

// const getJson = (url, errorMessage = 'Something Went wrong') => {
//   return fetch(url).then(response => {
//     // console.log(response);
//     if (!response.ok) {
//       throw new Error(`${errorMessage} ${response.status}`);
//     } else {
//       // console.log(response.json());
//       return response.json();
//     }
//   });
// };

// const getCountryData = country => {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response =>  {
//       // console.log(response);
//       if(!response.ok) {
//         throw new Error(`Country not found ${response.status}`)
//       } else {
//       // console.log(response.json());
//       return response.json()
//     }
//     })
//     .then(data => {
//       renderData(data[0]);
//       // const neighbour = data[0]?.borders[0];
//       const neighbour = 'jfhdjgh';
//       console.log(neighbour);
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if(!response.ok) {
//         throw new Error(`Country not found ${response.status}`)
//       }
//       return response.json()

//       })
//     .then(data => renderData(data[0], 'neighbour'))
//     .catch(err => {
//       // console.error(`${err}`);
//       renderError(`Something went wrong ${err.message}. Try again later`);
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('dfdgg');

////////////////////////
// Throwing Errors manually and apply DRY principle

// const getCountryData = country => {
//   getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderData(data[0]);
//       const neighbour = data[0]?.borders[0];
//       // const neighbour = 'jfhdjgh';
//       console.log(neighbour);
//       if(!neighbour) throw new Error(`No neighbour country found`);
//       return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
//     })
//     .then(data => renderData(data[0], 'neighbour'))
//     .catch(err => {
//       // console.error(`${err}`);
//       renderError(`Something went wrong ${err.message}. Try again later`);
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS 
coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a
 longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you
 recieved about the provided location. Then, using this data, log a messsage like this to the
  console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get
 this error with code 403. This is an error with the request. Remember, fetch() does NOT reject
  the promise in this case. So create an error to reject the promise yourself,
   with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a
//  longitude value (lng) (these are GPS coordinates, examples are below).

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if(!response.ok) {
//         throw new Error(`Problem with geocoding ${response.status}`)
//       } else {
//       // console.log(response);
//       return response.json();
//       }
//     })

//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//     })
//     .catch(err => console.log(err.message));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log('Test');
// setTimeout(() => console.log('0 sec timer'), 0)
// Promise.resolve('Resolved promise 1').then(response => console.log(response));
// console.log('Test end');

// 1. Test
// 2. Test end
// 3. 0 sec timer
// 4. response

// const lotteryTicket = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function(){
//     if(Math.random() >= 0.5) {
//       resolve('You Won');
//     } else {
//       reject( new Error('You lose'))
//     }
// }, 2000)
// });

// lotteryTicket.then((response) => console.log(response)).catch((err) => console.log(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2).then(()=> {
//   console.log('Waited for 2 seconds');
//   return wait(1);
// }).then(()=> console.log('waited for 1 second'));

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(5);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem..')).catch(x => console.error(x));

// console.log(navigator);
// console.log(navigator.geolocation);

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.log(error)
// );

// const getPosition = function() {
//   return new Promise(function(resolve, reject) {
//   navigator.geolocation.getCurrentPosition(
//   // position => resolve(position),
//   // error => console.log(error)
//   resolve, reject
// );
//   })
// }

// getPosition().then(position => console.log(position));
// getPosition().then(position => console.log(position.coords));

/////////////////////////////
// ASYNC / AWAIT

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      // position => resolve(position),
      // error => console.log(error)
      resolve,
      reject
    );
  });
};

// getPosition().then(res => console.log(res));

// https://geocode.xyz/${lat},${lng}?geoit=json

const whereAmI = async function (country) {
  const pos = await getPosition();
  // console.log(pos);
  // console.log(pos.coords);
  const {latitude: lat, longitude: lng} = pos.coords;
  // console.log(pos.coords);
  const geoResponse = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  console.log(geoResponse);
  const geoData = await geoResponse.json();
  console.log(geoData);


  // const res = await fetch(`https://restcountries.com/v3.1/name/${geoData.country}`);
  // console.log(res);
  // console.log(res.json());
  const data = await res.json();
  // console.log(data);
  // console.log(data[0]);
  renderData(data[0]);
};

whereAmI('portugal');
// console.log('first');

/////////////////
// TRY CATCH METHOD

try{ 
let a = 4;
const b = 7;
b = 5;
} catch(err) {
  alert(err.message);
}