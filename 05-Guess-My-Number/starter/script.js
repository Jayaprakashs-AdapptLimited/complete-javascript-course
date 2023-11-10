'use strict';
/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct';

console.log(document.querySelector('.number').textContent = 10);
document.querySelector('.score').textContent = 20;
document.querySelector('.guess').value = 13;

console.log(document.querySelector('.guess').value);
*/

document.querySelector('.check').addEventListener(
    'click', function () {
        console.log(document.querySelector('.guess').value);
    }
)

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';
    // displayMessage('No number!');
  }