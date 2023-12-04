'use strict';
/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct';

console.log(document.querySelector('.number').textContent = 10);
document.querySelector('.score').textContent = 20;
document.querySelector('.guess').value = 13;

console.log(document.querySelector('.guess').value);
*/

let guessNumber = Math.trunc(Math.random() * 20) + 1;
console.log(guessNumber);
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener(
    'click', function () {
        const guess = Number(document.querySelector('.guess').value);
        console.log(guess, typeof guess);

         // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';
    // displayMessage('No number!');
  } else if(guess === guessNumber){
    if(score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    document.querySelector('.number').textContent = guessNumber;
    document.querySelector('.message').textContent = 'Correct number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
  } else if(guess > guessNumber) {
    if(score > 1){
    document.querySelector('.message').textContent = 'Too high!';
    score--;
    document.querySelector('.score').textContent = score;
    } else {
    document.querySelector('.message').textContent = 'You Lost the game';
    }
  } else if(guess < guessNumber) {
    if(score > 1) {
    document.querySelector('.message').textContent = 'Too low!';
    score--;
    document.querySelector('.score').textContent = score;
    } else {
        document.querySelector('.message').textContent = 'You Lost the game';
    }
    }
}
)

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)
*/
document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    guessNumber = Math.trunc(Math.random() * 20) + 1;
    console.log(guessNumber);

    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').textContent = '';
    document.querySelector('body').style.backgroundColor = '#222';
})


