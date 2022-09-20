'use strict';
window.onload = () => {
  mainFunction();
};

// !Random number generator
const randomNumberGenerator = function () {
  // return Math.trunc(Math.random() * 6 + 1);
  return 95;
};

// !Main Function
const mainFunction = function () {
  const playersScore = document.querySelectorAll('.score');
  const playerCurrentScore = document.querySelectorAll('.current-score');
  const player0TotalScore = document.querySelector('#score--0');
  const player1TotalScore = document.querySelector('#score--1');

  const diceImg = document.querySelector('.dice');

  const btnRoll = document.querySelector('.btn--roll');
  const btnHold = document.querySelector('.btn--hold');
  const btnReset = document.querySelector('.btn--new');

  const player0 = document.querySelector('.player--0');
  const player1 = document.querySelector('.player--1');
  const player0CurrentScore = document.querySelector('#current--0');
  const player1CurrentScore = document.querySelector('#current--1');

  let temScore = 0;
  let totalScore0 = 0;
  let totalScore1 = 0;

  // *Setting all playerScore to zero
  for (let i = 0; i < playersScore.length; i++) {
    playersScore[i].textContent = '0';
    playerCurrentScore[i].textContent = '0';
  }

  //* remove dice Img
  diceImg.style.display = 'none';

  //* click roll dice btn
  btnRoll.addEventListener('click', function () {
    const randomDice = randomNumberGenerator();

    if (randomDice) {
      diceImg.style.display = 'block';
      diceImg.src = `dice-${randomDice}.png`;

      if (randomDice !== 1) {
        if (player0.classList.contains('player--active')) {
          temScore += randomDice;
          player0CurrentScore.textContent = temScore;
        } else {
          temScore += randomDice;
          player1CurrentScore.textContent = temScore;
        }
      } else {
        if (player0.classList.contains('player--active')) {
          player0CurrentScore.textContent = 0;
          player0.classList.remove('player--active');
          player1.classList.add('player--active');
          temScore = 0;
        } else {
          player1CurrentScore.textContent = 0;
          player1.classList.remove('player--active');
          player0.classList.add('player--active');
          temScore = 0;
        }
      }
    }
  });

  // * btn hold btn click
  btnHold.addEventListener('click', function () {
    if (player0.classList.contains('player--active')) {
      totalScore0 += temScore;
      player0TotalScore.textContent = totalScore0;
      if (totalScore0 >= 100) {
        player0.classList.add('player--winner');
        btnRoll.disabled = true;
        btnHold.disabled = true;
      } else {
        temScore = 0;
        player0CurrentScore.textContent = 0;
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
      }
    } else {
      totalScore1 += temScore;
      player1TotalScore.textContent = totalScore1;
      if (totalScore1 >= 100) {
        player1.classList.add('player--winner');
        btnRoll.disabled = true;
        btnHold.disabled = true;
      } else {
        temScore = 0;
        player1CurrentScore.textContent = 0;
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
      }
    }
  });

  // *btn reset button click
  btnReset.addEventListener('click', function () {
    temScore = 0;
    totalScore0 = 0;
    totalScore1 = 0;

    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    // *Setting all playerScore to zero
    for (let i = 0; i < playersScore.length; i++) {
      playersScore[i].textContent = '0';
      playerCurrentScore[i].textContent = '0';
    }

    //* remove dice Img
    diceImg.style.display = 'none';
    btnRoll.disabled = false;
    btnHold.disabled = false;

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
  });
};
