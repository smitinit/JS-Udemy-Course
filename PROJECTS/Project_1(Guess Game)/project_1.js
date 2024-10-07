'use strict';

let number = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highScore = 0;

const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check_btn').addEventListener('click', function () {
  const guess = Number(document.querySelector('.inpt').value);

  if (!guess) {
    displayMessage('No Number 😒!');
  } else if (guess === number) {
    displayMessage('Correct Guess😃!');
    document.querySelector('.number').textContent = number;
    // score += 1;
    // document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.check_btn').style.display = 'none';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== number) {
    if (score <= 1) {
      displayMessage('You Lost!!🥲');
    } else {
      guess > number
        ? displayMessage('A bit too High!!🥲')
        : displayMessage('A bit too Low!!🥲');
      score -= 1;
      document.querySelector('.score').textContent = score;
    }
  }
});

document.querySelector('.again_btn').addEventListener('click', function () {
  score = 10;
  number = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.inpt').value = '';
  document.querySelector('body').style.backgroundColor = '';
  document.querySelector('.check_btn').style.display = 'block';
});
