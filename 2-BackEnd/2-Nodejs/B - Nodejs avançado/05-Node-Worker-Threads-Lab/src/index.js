const { createJobConfig } = require("./models/job-config");
const { validateConfig } = require("./validators/job-validator");
const { runChunk } = require("./workers/run-chunk");

function executeLab() {
  const config = validateConfig(createJobConfig(20, 10));
  return [
    runChunk(1, config.chunkSize, 1),
    runChunk(config.chunkSize + 1, config.limit, 2),
  ];
}

module.exports = {
  executeLab,
};
