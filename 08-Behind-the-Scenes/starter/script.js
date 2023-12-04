// 'use strict';

// const calcAge = (birthYear) => {
//     const age= 2023 - birthYear;
//     // console.log(firstName);
//     const printAge = () => {
//         const result = `${firstName}, You are ${age} born in ${birthYear}`;
//         console.log(result, "Result");

//         if(birthYear >= 1980 && birthYear <= 1999) {
//             var sttt = true;
//             const millenial = `oh! You are a millenial, ${firstName}`;
//             console.log(millenial);

//             // Functions are block scoped
//             function add(a, b) {
//                 return a + b;
//             }

//         }
//         // console.log(millenial, "Millenial");
//         console.log(sttt);

//         // Functions are block scoped
//         console.log(add(3,5));

//     }
//     printAge();
//     return age;
// }

// const firstName = 'Shami';
// calcAge(1980);


// PRIMITIVES VS OBJECTS
let age = 18;
let oldAge = age;
// console.log(oldAge);
age = 20;
console.log(age);
console.log(oldAge);

const me = {
    name: 'jonas',
    age: 18,
};

const friend = me;
friend.age = 25;
console.log(friend, 'Friend');
console.log(me, 'me');

