'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
console.log(accounts, 'Accounts');

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayResults = function (movements, sort = false) {
  // console.log(movements, 'Movements');
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;
  console.log(movs);
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
                    <div class="movements__value"> ${mov}E </div>`;

    // containerMovements.insertAdjacentHTML('beforeend', html);

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// to calculate and display balance for particular account

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (accumulator, currentValue) {
    // console.log(currentValue);
    return accumulator + currentValue;
  }, 0);
  labelBalance.textContent = `${acc.balance}E`;
};
// console.log(acco)

// TO CALCULATE INCOME AND OUTGOING AND DISPLAY
const calcDisplaySummary = function (acc) {
  // console.log(acc.movements);
  const incomes = acc.movements
    .filter(movement => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement);
  // console.log(incomes);
  labelSumIn.textContent = `${incomes}E`;

  const out = acc.movements
    .filter(movement => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);
  // console.log(out);
  labelSumOut.textContent = `${Math.abs(out)}E`;

  const interest = acc.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * acc.interestRate) / 100)
    // console.log(interest);
    .filter((movement, i, arr) => movement >= 1)
    // console.log(arr))
    .reduce((accumulator, movement) => accumulator + movement);
  labelSumInterest.textContent = `${interest}E`;
};

// Side effects (do some work without return anything)
const createUserNames = function (accs) {
  // console.log(accs);
  accs.forEach(function (acc) {
    // console.log(acc.owner);
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);
console.log(accounts);

const updateUI = function (currentAccount) {
  // DISPLAY MOVEMENTS
  displayResults(currentAccount.movements);

  // DISPLAY BALANCE
  calcDisplayBalance(currentAccount);

  // DISPLAY SUMMARY
  calcDisplaySummary(currentAccount);
};

// // DISPLAY MOVEMENTS
// displayResults(currentAccount.movements);

// // DISPLAY BALANCE
// calcDisplayBalance(currentAccount);

// // DISPLAY SUMMARY
// calcDisplaySummary(currentAccount);

let currentAccount;
// EVENT HANDLERS

// const btnLogin = document.querySelector('.login__btn');
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Clicked');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  // console.log(Number(inputLoginPin.value));

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // to convert string to number
    console.log('Login');
    // Welcome msg and display UI
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // To clear Input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// AMOUNT TRANSFER LOGIC
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('clicked');
  const amount = Number(inputTransferAmount.value);
  console.log(amount);
  const transferTo = accounts.find(
    person => person.username === inputTransferTo.value
  );
  console.log(transferTo);

  // To clear Input fields
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    transferTo &&
    currentAccount.balance >= amount &&
    transferTo?.username !== currentAccount.username
  ) {
    //  console.log('Valid Transfer');
    // Doing Transfer
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);

    updateUI(currentAccount);
  }
});

// CLOSE ACCOUNT HANDLER
// const btnClose = document.querySelector('.form__btn--close');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Clicked');
  console.log(currentAccount);
  // console.log(inputCloseUsername.value);
  console.log(currentAccount.username);

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // console.log('Closed');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
});

//REQUEST LOAN HANDLER
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  // console.log('Loan');
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // console.log('Loan sanctioned');
    // Add amount to movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

});


// SORT HANDLER
let sortedState = false;
btnSort.addEventListener('click', function() {
  displayResults(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

// console.log(accounts);

// const user = 'Steven Thomas Williams';

// console.log(initial);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// // Array Methods
// // SLICE
// const arr = ['mango', 'banana', 'orange', 'apple', 'watermelon'];

// console.log(arr.slice(1));
// console.log(arr.slice(2,4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());

// //SPLICE
// // console.log(arr.splice(2));
// console.log(arr);
// arr.splice(1,3); // Second one (2) denotes number of elements to be deleted
// console.log(arr);

// // REVERSE
// const array1 = ['a', 'b', 'c', 'd', 'e'];
// const array2 = ['k', 'j' , 'i', 'h', 'g', 'f'];
// array2.reverse();
// console.log(array2);

// //CONCAT
// const concat = array1.concat(array2);
// console.log(concat);
// // Spread operator
// console.log([...array1, ...array2]);

// console.log(concat.join( '-' )); // Return string

// ///////////////////////////////////////
// // The new at Method
// const arrAt = [23, 11, 64];
// console.log(arrAt[0]);
// console.log(arrAt.at(0));

// // getting last array element
// console.log(arrAt[arrAt.length - 1]);
// console.log(arrAt.slice(-1)[0]);
// console.log(arrAt.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.entries());

// //FOR OF
// // for(const flow of movements) {
// //   if(flow > 0)
// //   console.log(`You deposited ${flow}`);
// //   else
// //   console.log(`You withdrew ${Math.abs(flow)}`);
// // };

// // Entries method

// for(const [i, movement] of movements.entries()) {
//   if(movement > 0)
//   console.log(`Movement${i + 1}: You deposited ${movement}`);
//   else
//   console.log(`Movement${i + 1}: You withdrew ${Math.abs(movement)}`);
// }

// //FOR EACH

// movements.forEach(function(movement) {
//   if(movement > 0) {
//     console.log(`You deposited ${movement}`);
//   }
//   else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

// //0: function(400)
// //1: function(450)
// // ...

// // Syntax : array.forEach(function(currentValue, index, arr), thisValue)

// movements.forEach(function(movement, i, arr) {
//   // console.log(arr);
//   if(movement > 0) {
//     console.log(`Movement${i + 1}: You deposited ${movement}`);
//   }
//   else {
//     console.log(`Movement${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // console.log(currencies);

// currencies.forEach(function(value, key, map){
//   console.log(`${key} : ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age,
and stored the data into an array (one array for each).
For now, they are just interested in knowing whether a dog is an adult or a puppy.
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
 and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs!
 So create a shallow copy of Julia's array, and remove the cat ages from that copied array 
 (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult,
 and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
 and does the following things:
*/

/*
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

console.log(dogsJulia);




function checkDogs(dogsJulia, dogsKate) {
const dogsJuliaCorrected = dogsJulia.slice(1, -2);
console.log(dogsJuliaCorrected);

const dogs = dogsJuliaCorrected.concat(dogsKate);
console.log(dogs, 'dogs');

dogs.forEach(function(value, key) {
  const checkAdult = value >= 3 ? 'adult' : 'puppy';
  console.log(`Dog number ${key + 1} is an ${checkAdult} and is ${value} years old`);
})
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs(dogsJulia, dogsKate);
*/

// /////////////////////
// // MAP METHOD
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUSD = 1.1;

// // const movementsUSD = movements.map(function(mov) {
// //   return mov * euroToUSD;
// // });
// //using arrow function
// const movementsUSD = movements.map(mov => mov * euroToUSD);

// console.log(movementsUSD);

// // for of method
// const movementsUSDfor = [];
// for (const mook of movements) {
//   movementsUSDfor.push(mook * euroToUSD);
//   // console.log([mook * euroToUSD]);
// }
// console.log(movementsUSDfor);

// const movementDescription = movements.map(
//   (mov, i, arr) =>
//     `Movement${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementDescription);

// //////////////
// // FILTER METHOD

// console.log(movements);

// const deposits = movements.filter(function(mov) {
//   // console.log(mov);
//   return mov > 0;
// });
// console.log(deposits);

// const withdrawals = movements.filter(function(mov) {
//   return mov < 0;
// })
// console.log(withdrawals);

// console.log(movements);

// //Accumulator is like a Snowball
// const balance = movements.reduce(function(accumulator, currentValue, index, array) {
//   // console.log(index);
//   console.log(`Iteration ${index} : ${currentValue}`);
//   return accumulator + currentValue;
// }, 0); // initial value
// console.log(balance);

// for (const bal of movements) {
//   console.log(bal);
// };

// // To find maximum value in an array
// const maximum = movements.reduce((accumulator, currentValue) => {
//   // console.log(currentValue)
//    if(accumulator > currentValue){
//     return accumulator
//   }
//   else {
//     return currentValue
//   }
// }, movements[0]);
// console.log(maximum);

// ///////////////////
// /*
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages
//  and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'),
//  and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
//  humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are
//   at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges
//    how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// // const calcAverageHumanAge = function(ages) {
// //   /*
// //   1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
// //  humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// //  */
// //   // console.log(ages);
// //   const dogAgeHuman = ages.map(function(value) {
// //     // console.log(value);
// //     if(value <= 2) return 2 * value;
// //     else if(value>2) return 16 + (value * 4)
// //   })
// //   console.log(dogAgeHuman);

// //   // 2.
// //   const adultDogs = dogAgeHuman.filter(function(value) {
// //     return value > 18;
// //   })
// //   console.log(adultDogs);

//   //3. Average
//   // const balance = movements.reduce(function(accumulator, currentValue) {
//   //   // console.log(currentValue);
//   //   return accumulator + currentValue;
//   // Method - 1:
//   // const averageHuman = adultDogs.reduce((accumulator, value) =>
//   //   accumulator + value ,0) / adultDogs.length
//   // Method - 2:
// //     const averageHuman = adultDogs.reduce((accumulator, value, i, arr) =>
// //     accumulator + value / arr.length,0)
// //      return averageHuman;
// // }
// // console.log(averageHuman);

// // const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// // console.log(average1);

// // const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// // console.log(average2);

// //////////////
// // Chaining Methods
// // const euroToUSD = 1.1;

// // console.log(movements);
// // const depositUSD = movements.filter(movement => movement > 0).
// // map(movement => movement * euroToUSD).
// // // map((movement,i, arr) => {
// // //   // console.log(movement);
// // //   console.log(arr);
// // // })
// // reduce((accumulator, val) => accumulator + val, 0);

// // console.log(depositUSD);

// ///////////////////////////////////////
// // Coding Challenge #3

// /*
// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function,
// and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// /*
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages
//  and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'),
//  and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
//  humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are
//   at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges
//    how we calculate averages 😉)
// 4. Run the function for both test datasets
// */

// const calcAverageHumanAge = function(ages) {
//   // console.log(ages);
//   const dogHumanAge = ages.map(age => age <=2 ? 2 * age : 16 + age * 4).filter(age => age>=18).
//   reduce((accumulator, age, i , arr) =>
//   // console.log(accumulator)

//   // accumulator + age
//   // console.log(age)
//   accumulator + age / arr.length  ,0);
//   console.log(dogHumanAge);
//   return dogHumanAge;
// }

// const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(average1, average2);

// //////////
// // FIND
// console.log(accounts);
// const oneAccount = accounts.find(acc => acc.owner === 'Sarah Smith');
// console.log(oneAccount);


/////////
// INCLUDES
console.log(account1.movements);
console.log(account1.movements.includes(70));

// some

const some = account1.movements.some(mov => mov > 0);
console.log(some);

//every

const every = account4.movements.every(mov => mov > 0);
console.log(every);

// Flat
const allMovements = accounts.map(mov => mov.movements);
console.log(allMovements);
const allMovementsValue = allMovements.flat();

const overallBalance = allMovementsValue.reduce((acc, val) => acc + val, 0);
console.log(overallBalance);

// Flat Map
const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, val) => acc + val);
console.log(overallBalance2);


///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Emprty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

// That's why we have Fill method
// x.fill(3);
x.fill(3, 2);
console.log(x);

// arr.fill(33);
// arr.fill(33, 3)
arr.fill(33, 2, 5);
console.log(arr);

const y = Array.from({length: 8}, (_, i) => i + 1);
console.log(y);