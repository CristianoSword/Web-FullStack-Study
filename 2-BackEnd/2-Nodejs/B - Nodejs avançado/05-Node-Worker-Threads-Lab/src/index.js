const { runChunk } = require("./workers/run-chunk");

function executeLab() {
  return [runChunk(1, 10, 1), runChunk(11, 20, 2)];
}

module.exports = {
  executeLab,
};
