function sum(a, b) {
  return a + b;
}

function average(a, b) {
  return sum(a, b) / 2;
}

function safeDivide(value, divider) {
  if (divider === 0) {
    throw new Error("Divider cannot be zero.");
  }

  return value / divider;
}

module.exports = { sum, average, safeDivide };
