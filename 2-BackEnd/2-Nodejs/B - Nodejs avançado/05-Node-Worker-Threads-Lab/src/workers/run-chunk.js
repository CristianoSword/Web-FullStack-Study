const { sumRange } = require("../services/prime-service");

function runChunk(start, end, workerId) {
  return sumRange(start, end, workerId);
}

module.exports = {
  runChunk,
};
