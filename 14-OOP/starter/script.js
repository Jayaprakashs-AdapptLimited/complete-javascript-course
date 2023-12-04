'use strict';
 
///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
    // console.log(this);

    // Instance properties
    // console.log(this.ttt = firstName);
    this.fff = firstName;
    this.bbb = birthYear;

    // Never to this! (Prototype)
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
}

const jack = new Person('Jack', 1977);
console.log(jack);

/*
4 Steps: 
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
*/

//PROTOTYPE
console.log(Person.prototype);

Person.prototype.calcAge = function() {
    console.log(2023-this.bbb);
}

jack.calcAge();

console.log(jack.__proto__);
// console.log(jack.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jack));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jack)

console.log(jack.hasOwnProperty('firstName'));
console.log(jack.hasOwnProperty('species'));
