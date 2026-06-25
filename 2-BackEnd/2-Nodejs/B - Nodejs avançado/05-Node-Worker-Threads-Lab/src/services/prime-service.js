const { createResult } = require("../types/result-shape");

function sumRange(start, end, workerId) {
  let partial = 0;

  for (let value = start; value <= end; value += 1) {
    partial += value;
  }

  return createResult(workerId, partial);
}

module.exports = {
  sumRange,
};
