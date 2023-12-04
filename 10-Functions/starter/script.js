'use strict';

///////////////////////////////////////
// // Default Parameters

// const bookingDetails = [];

// // ES6
// const createBooking = function(flightNumber, numPassengers=3, price=2000 * 2) {

//     // ES5
//     // numPassengers = numPassengers || 1;
//     // price = price || 450;

//     const booking = {
//         flightNumber,
//         numPassengers,
//         price
//     }
//     console.log(booking, 'Booking');
//     bookingDetails.push(booking);
// }

//  createBooking('HI847');
//  console.log(bookingDetails, 'Booking Details');

//  createBooking('AI666', 4, 500);
//  createBooking('HI847', undefined, 1000);


//  createBooking('BK562', undefined, 200);


 ///////////////
//  // PASSING ARGUMENTS WORKS

//  const flightNumber = 'ITY528';
//  const jonas = {
//     name: 'Jonas Schmedtmann',
//     passportNumber: 7814132364,
//  };

//  const checkIn = function (number, passenger) {
//     number = 'ORE245';
//     passenger.name = 'MR. ' + passenger.name;

//     if(passenger.passportNumber === 7814132364) {
//         // console.log('ifff');
//         alert('Checked In');
//     }
//     else {
//         alert('Wrong Password');
//     }
// };
 

//  checkIn(flightNumber, jonas);
// // Same as 
// // const number = flightNumber;
// // const passenger = jonas;

//  console.log(flightNumber);
//  console.log(jonas);


// const newPassport = function(person) {
//     person.passportNumber = (Math.trunc(Math.random() * 1000000) + 1);
//     console.log(person.passportNumber);
//     alert('Wrong Password');
// }

// newPassport(jonas);


///////////////////////////////////////
// Functions Accepting Callback Functions
// const oneWord = function (str) {
//     return str.replace(/ /g, '').toLowerCase();
//   };

// const upperFirstWord = function (str) {
//     const [first, ...others] = str.split(' ');
//     return [first.toUpperCase(), ...others].join(' ');
//   };

// const transformer = function (str, fn) {
//     console.log(`Original string: ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);
  
//     console.log(`Transformed by: ${fn.name}`);
// }

// transformer('Javascript is the best', upperFirstWord);
// transformer('Javascript is the best', oneWord);


// // JS uses callbacks all the time
// const high5 = function () {
//     console.log('HIIII');
//   };
//   document.body.addEventListener('click', high5);
//   ['Jonas', 'Martha', 'Adam'].forEach(high5);



/////////////
// FUNCTIONS RETURNING FUNCTIONS

// const greet = function(greeting) {
//     return function(name) {
//         console.log(`${greeting} ${name}`);
//     } 
// }

// const greetHey = greet('Hey');
// greetHey('jueuhf');
// greetHey('dfjhdj');

// Arrow Function
// const greet = greeting => name => console.log(`${greeting} ${name}`);


// const greetHey = greet('Hey');
// greetHey('Jonas');
// greetHey('Daff');
 

// const array = ["a", "b"];
// const elements = [0, 1, 2];
// array.push.apply(array, elements);
// console.info(array); 

///////////

// Call and Apply Methods
const airIndia = {
    airlineName: 'AirIndia',
    code: 'AI',
    bookings: [],
    book(name, flightNumber) {
        console.log(`${name} booked a seat on ${this.airlineName} flight ${this.code} ${flightNumber}`);
        this.bookings.push({flight: `${this.code} ${flightNumber}`, name});
    },
    
}

airIndia.book('Jacob', '789'); // Jacob booked a seat on AirIndia flight AI LN789
airIndia.book('Siraj', '564');

console.log(airIndia, 'Air India');

const indigo = {
    airlineName: 'indigo',
    code: 'IN',
    bookings: [],
}

const book = airIndia.book;
// console.log(book, "book");
// book('Shami', '333'); //does not work

//Call Method
book.call(indigo, 'Yuvi', '963');
console.log(indigo, 'Indigo');

airIndia.book('Hardik', '547');
console.log(airIndia);

book.call(indigo, 'Rahul', '742');
console.log(indigo);

const akasaAir = {
    airlineName: 'Akasa Air',
    code: 'AK',
    bookings: [],
};

book.call(akasaAir, 'Ruthraj', '222');
console.log(akasaAir);

//Apply Method

const flightData = ['Williamson', '321'];
// book.apply(akasaAir, flightData);
// console.log(akasaAir);

book.call(akasaAir, ...flightData);
console.log(akasaAir);

// BIND
const bookIndigo = book.bind(indigo);
const bookAkasaAir = book.bind(akasaAir);
bookIndigo('Cummins', '94');

//To set first argument fixed
const bookAkasaAir33 = book.bind(akasaAir, 'Axar');
bookAkasaAir33('522');


/////////
// With Event Listeners

airIndia.planes = 300;
console.log(airIndia);

airIndia.buyPlane = function (){
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', airIndia.buyPlane.bind(airIndia));


// PARTIAL APPLICATION

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 100));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
    console.log('This will never run again');
  };
  runOnce();
  
  // IIFE
  (function () {
    console.log('This will never run again');
    // const isPrivate = 23;
  })();

//   console.log(isPrivate);

  (() => console.log(('This will also run')))();



  ///////////////
  // CLOSURES
  