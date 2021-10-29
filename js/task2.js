// Your code goes here

const ROULETTE_STEP = 4,
  ROULETTE_ATTEMPTS = 3,
  INITIAL_MAX_PRIZE = 100,
  PRIZE_MULTIPLIER = 2,
  INITIAL_ROULETTE_MIN = 0,
  INITIAL_ROULETTE_MAX = 8;

/*
 * Some sort of 'Main' function for casino roulette game
 */
(function () {
  let isPlay = window.confirm('Do you want to play a game?');

  if (!isPlay) {
    window.alert('You did not become a billionaire, but can.');
    return;
  } else {
    let wantContinue = false;
    let wantAgain = false;
    do {
      // Play again section
      let totalPrize = 0,
        maxPrize = INITIAL_MAX_PRIZE,
        rouletteMin = INITIAL_ROULETTE_MIN,
        rouletteMax = INITIAL_ROULETTE_MAX;
      do {
        // Continue to play section

        for (
          let attempt = 1, multiplier = attempt;
          attempt <= ROULETTE_ATTEMPTS;
          attempt++, multiplier /= PRIZE_MULTIPLIER
        ) {
          let randomNumber = getRandomNumber(rouletteMax);

          let attemptsLeft = ROULETTE_ATTEMPTS - attempt + 1;
          let s = attemptsLeft > 1 ? "'s" : '';
          let possiblePrize = maxPrize * multiplier;

          let userBet = getInputNumber(
            `Choose an roulette pocket number from ${rouletteMin} to ${rouletteMax}
Attempt${s} left: ${attemptsLeft}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${possiblePrize}$`,
            '',
            number =>
              number >= rouletteMin &&
              number <= rouletteMax &&
              Number.isInteger(number)
          );

          // all numbers are integers so it works fine
          if (randomNumber === userBet) {
            totalPrize += possiblePrize;
            wantContinue = window.confirm(
              `Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`
            );
            if (!wantContinue) {
              wantAgain = isWantAgain(totalPrize);
            }
            break;
          } else {
            // if you've lost your last attempt - ask if you want to play again
            if (attempt === ROULETTE_ATTEMPTS) {
              wantContinue = false;
              wantAgain = isWantAgain(totalPrize);
              break;
            }
          }
        }

        rouletteMax += ROULETTE_STEP;
        maxPrize *= PRIZE_MULTIPLIER;
      } while (wantContinue);
    } while (wantAgain);
  }

  /**
   * This function should ask a player if he want to play again and
   * show his prize.
   * @param {number} prize player's prize to show
   * @returns {boolean} true, if player wants to play again, else - false
   */
  function isWantAgain(prize) {
    window.alert(`Thank you for your participation. Your prize is: ${prize}$`);
    return window.confirm(`Do you want to play again?`);
  }
})();

/**
 * This function should return a random integer number in range [0..maxNumber]
 * @param {number} maxNumber the maximal integer number in range
 * @returns {number} random integer number in range [0..maxNumber]
 */
function getRandomNumber(maxNumber) {
  let randomNumber = Math.random() * maxNumber;
  return Math.round(randomNumber);
}

/**
 * This function asks a user to input number, the valid number should be returned.
 * In other cases, it asks the user again.
 * @param {string} msg a message is shown to the user
 * @param {string} placeholder the default value in the input field
 * @param {function} validate callback function to validate the user`s input (returns
 *                      true if input is valid, else false)
 * @returns {number} the number entered by the user or null, if the user pressed cancel
 */
function getInputNumber(msg, placeholder, validate) {
  let input, isValid;
  do {
    input = window.prompt(msg, placeholder);
    if (input === null) {
      return input;
    }
    isValid = !!input.length && !Number.isNaN(+input) && validate(+input);
    if (!isValid) {
      window.alert('Invalid input data');
    }
  } while (!isValid);
  return Number(input);
}
