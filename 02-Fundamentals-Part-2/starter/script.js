

// FUNCTIONS
// const yearsUntilRetirement = (birthyear, firstName) => {
//     const age = 2023 - birthyear;
//     const retirement = 65 - age;
//     // return retirement;
//     return `${firstName} retires in ${retirement} years`;
// }

// console.log(yearsUntilRetirement(1994, 'Kohli'));


//FUNCTION CALLING OTHER FUNCTION

// function fruitProcessor


// // Basic Array Operations (Methods)
// const friends = ['Michael', 'Steven', 'Peter'];

// // Add elements
// const newLength = friends.push('Jay');
// console.log(friends);
// console.log(newLength);

// friends.unshift('John');
// console.log(friends);

// // Remove elements
// friends.pop(); // Last
// const popped = friends.pop();
// console.log(popped);
// console.log(friends);

// friends.shift(); // First
// console.log(friends);

// console.log(friends.indexOf('Steven'));
// console.log(friends.indexOf('Bob'));

// friends.push(23);
// console.log(friends.includes('Steven'));
// console.log(friends.includes('Bob'));
// console.log(friends.includes(23));

// if (friends.includes('Steven')) {
//   console.log('You have a friend called Steven');
// }

// Dot vs. Bracket Notation
// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     age: 2037 - 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven']
//   };
//   console.log(jonas);
  
//   console.log(jonas.lastName);
//   console.log(jonas['lastName']);
  
  // const nameKey = 'Name';
  // console.log(jonas['first' + nameKey]);
  // console.log(jonas['last' + nameKey]);
  
//   console.log(jonas.'last' + nameKey)
  
//   const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends');
  
//   if (jonas[interestedIn]) {
//     console.log(jonas[interestedIn]);
//   } else {
//     console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
//   }
  
//   jonas.location = 'Portugal';
//   jonas['twitter'] = '@jonasschmedtman';
//   console.log(jonas);


  // "Jonas has 3 friends, and his best friend is called Michael"

  // console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`); 



  // Object Methods

// const jonas = {
//   firstName: 'Jonas',
//   lastName: 'Schmedtmann',
//   birthYear: 1991,
//   job: 'teacher',
//   friends: ['Michael', 'Peter', 'Steven'],
//   hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // }

  // calcAge: function () {
  //   console.log(this);
  //   return 2037 - this.birthYear;
  // }

  // Challenge
  // "Jonas is a 46-year old teacher, and he has a driver's license"

//   calcAge: function () {
//     this.age = 2037 - this.birthYear;
//     return this.age;
//   },

//   summary: function () {
//     return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'not'} driver's license`
//   },
// };

// console.log(jonas.calcAge());
// console.log(jonas.summary());

// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);



// const mark = {
//   fullName: 'Mark Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI : function() {
//       console.log(this);
//       this.bmi = this.mass / (this.height * this.height);
//       return this.bmi;
//   }
// }

// // console.log()
// console.log(mark.calcBMI());

// const john = { 
//   fullName: 'John Smith', 
//   mass: 92,
//   height: 1.95,
//   calcBMI : function() {
//       this.bmi = this.mass / (this.height * this.height);
//       return this.bmi;
//   }
// }
// console.log(john.calcBMI());
// console.log(mark.bmi);


// ARRAYS

// const years = [1997, 1994, 1996, 2000];
// // console.log(years);

// const ages = [];

// for(i=0; i<years.length; i++) {
//   ages.push(2023 - years[i]);
// }

// console.log(ages);


// BACKWARD LOOPS

// const jonas = [
//   'Jonas',
//   'Schmedtmann',
//   1991,
//   'teacher',
//   ['Michael', 'Peter', 'Steven'],
//   true,
// ]

// // Forward loop
// // for(i = 0; i < jonas.length - 1; i++){
// //   console.log(i, jonas[i]);
// // }

// Backward loop
// for(i = jonas.length - 1; i >= 0; i--){
//   // console.log(i, jonas[i]);
// }


// FOR LOOP

for (let rep = 1; rep <= 10; rep++) {
  // console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

// WHILE LOOP

// let rep = 1;
// while (rep <= 10) {
//   // console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
//   rep++;
// }

// let dice = Math.trunc(Math.random() * 6 + 1);
// // console.log(dice);

// while(dice !== 6) {
//   console.log(`You rolled ${dice}`);
//   dice = Math.trunc(Math.random() * 6 + 1);
// }



// CHALLENGE 3:

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  }

/* Write your code below. Good luck! 🙂 */

//Create an array called bills containing all 10 test bill values.
const bills = [ 22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
console.log(bills, "bills");

//Create empty arrays for the tips and the totals (tips and totals)
const tips = [];
// console.log(tips, "Tips");

const totals = [];

/* Use the calcTip function we wrote before (included in the starter code) to calculate tips and
 total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the
10 calculations! */

for(let i=0; i<bills.length; i++) {
  // console.log(bills.length, "Length");
  const tip = calcTip(bills[i]);
  tips.push(tip);
  // console.log(tip, "tip");
  totals.push(tip + bills[i])
}
console.log(tips, "Tips");
console.log(totals, 'totals');


/* 4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0.
   Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array 
*/

const calcAverage = (arr) => {

  let sum = 0;
  for(let i=0; i<arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum / arr.length;
}

// const calcAverage = function (arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     // sum = sum + arr[i];
//     sum += arr[i];
//   }
//   return sum / arr.length;
// }
console.log(calcAverage([2,3,7]));




































