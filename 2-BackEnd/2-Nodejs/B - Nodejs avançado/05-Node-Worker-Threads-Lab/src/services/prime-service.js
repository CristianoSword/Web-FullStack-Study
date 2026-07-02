const { createResult } = require("../types/result-shape");

function isPrime(value) {
  if (value < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
    if (value % divisor === 0) {
      return false;
    }
  }

  return true;
}

function sumRange(start, end, workerId) {
  let partial = 0;
  let primeCount = 0;

  for (let value = start; value <= end; value += 1) {
    if (isPrime(value)) {
      partial += value;
      primeCount += 1;
    }
  }

  return createResult(workerId, start, end, partial, primeCount);
}

module.exports = {
  sumRange,
  isPrime,
};
