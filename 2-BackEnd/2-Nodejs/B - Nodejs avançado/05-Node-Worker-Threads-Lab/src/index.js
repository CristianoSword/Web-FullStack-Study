const path = require("path");
const { Worker } = require("worker_threads");
const { createJobConfig, createRanges } = require("./models/job-config");
const { validateConfig } = require("./validators/job-validator");
const { createAggregate } = require("./types/result-shape");

function executeChunk(range) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, "./workers/run-chunk.js"), {
      workerData: range,
    });

    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });
}

async function executeLab(limit = 50, chunkSize = 10) {
  const config = validateConfig(createJobConfig(limit, chunkSize));
  const ranges = createRanges(config.limit, config.chunkSize);
  const results = await Promise.all(ranges.map(executeChunk));
  return createAggregate(results);
}

if (require.main === module) {
  const [limitArg, chunkArg] = process.argv.slice(2).map((value) => Number(value));
  executeLab(limitArg || 50, chunkArg || 10)
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch((error) => {
      console.error("Worker lab failed:", error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  executeLab,
};
