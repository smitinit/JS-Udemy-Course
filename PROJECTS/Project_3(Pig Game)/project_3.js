'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');

score0.textContent = 0;
score1.textContent = 0;

const LIMIT = 100;

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  diceElement.classList.remove('hidden');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');
  document.getElementById('winner--1').classList.add('hidden');
  document.getElementById('winner--0').classList.add('hidden');
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
}

rollBtn.addEventListener('click', function () {
  if (playing) {
    let randomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${randomDiceRoll}.png`;

    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= LIMIT) {
      document
        .getElementById(`winner--${activePlayer}`)
        .classList.remove('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
