// Your code goes here

const MIN_AMOUNT = 1000,
  MIN_YEARS = 1,
  MIN_PERCENTAGE = 0,
  MAX_PERCENTAGE = 100,
  FRACTION_DIGITS = 2;

/*
 * Some sort of 'Main' function.
 * iife - elegant way to get rid of 'if & if-else' cascades,
 * when variable scope is important
 */
(function () {
  let initialMoney = getInputNumber(
    'Your initial amount of money:',
    '1000',
    v => v >= MIN_AMOUNT
  );

  // if user click cancel - all next interaction was canceled
  if (initialMoney === null) {
    return;
  }

  let numYears = getInputNumber(
    'Number of years:',
    '1',
    years => years >= MIN_YEARS && Number.isInteger(years)
  );

  // if user click cancel - all next interaction was canceled
  if (numYears === null) {
    return;
  }

  let percentage = getInputNumber(
    'Percentage of a year (Annual rate):',
    '10',
    v => v >= MIN_PERCENTAGE && v <= MAX_PERCENTAGE
  );

  // if user click cancel - all next interaction was canceled
  if (percentage === null) {
    return;
  }

  // Do all calculations
  let totalMoney = calcAmount(initialMoney, numYears, percentage);
  let totalProfit = calcProfit(totalMoney, initialMoney);

  // show result
  window.alert(
    `Initial amount: ${initialMoney}
Number of years: ${numYears}
Percentage of year: ${percentage}
  
Total profit: ${totalProfit.toFixed(FRACTION_DIGITS)}
Total amount: ${totalMoney.toFixed(FRACTION_DIGITS)}`
  );
})();


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

/**
 * This function should calculate the total amount of money you should get
 * from the deposit account.
 * @param {number} initialMoney initial amount of money
 * @param {number} years number of years
 * @param {number} percentage percentage of a year
 * @returns {number} total amount of your deposit account you should get
 */
function calcAmount(initialMoney, years, percentage) {
  let totalAmount = initialMoney;
  for (let y = 0; y < years; y++) {
    totalAmount += totalAmount * (percentage / MAX_PERCENTAGE);
  }
  return totalAmount;
}

/**
 * This function should calculate the total profit.
 * @param {number} currentMoney current amount of money
 * @param {number} initialMoney initial amount of money
 * @returns {number} your profit
 */
function calcProfit(currentMoney, initialMoney) {
  return currentMoney - initialMoney;
}
