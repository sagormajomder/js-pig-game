'use strict';
window.onload = () => {
  initValue();
  mainFunction();
};

// !Variables
const playersScore = document.querySelectorAll('.score');
const playerCurrentScore = document.querySelectorAll('.current-score');

const diceImg = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let score = [0, 0];
let temScore = 0;
let activePlayer = 0;

// !btn disable
const btnDisable = function (value) {
  btnRoll.disabled = value;
  btnHold.disabled = value;
};

// !initialize value
const initValue = function () {
  score = [0, 0];
  temScore = 0;
  activePlayer = 0;
  // *Setting all playerScore to zero
  for (let i = 0; i < playersScore.length; i++) {
    playersScore[i].textContent = '0';
    playerCurrentScore[i].textContent = '0';
  }

  //* remove dice Img
  diceImg.classList.add('hidden');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  btnDisable(false);

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

// !Switch Player
const playerSwitching = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  temScore = 0;
  player1.classList.toggle('player--active');
};

// !Random number generator
const randomNumberGenerator = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

// !Main Function
const mainFunction = function () {
  //* click roll dice btn
  btnRoll.addEventListener('click', function () {
    const randomDice = randomNumberGenerator();

    if (randomDice) {
      diceImg.classList.remove('hidden');
      diceImg.src = `dice-${randomDice}.png`;

      if (randomDice !== 1) {
        temScore += randomDice;
        document.querySelector(`#current--${activePlayer}`).textContent =
          temScore;
      } else {
        playerSwitching();
      }
    }
  });

  // * btn hold button click
  btnHold.addEventListener('click', function () {
    score[activePlayer] += temScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      btnDisable(true);
      diceImg.classList.add('hidden');
    } else {
      playerSwitching();
    }
  });

  // *btn reset button click
  btnReset.addEventListener('click', initValue);
};
