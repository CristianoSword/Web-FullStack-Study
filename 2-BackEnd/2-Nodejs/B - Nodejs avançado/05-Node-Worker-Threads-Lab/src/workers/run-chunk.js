const { isMainThread, parentPort, workerData } = require("worker_threads");
const { sumRange } = require("../services/prime-service");

function runChunk(start, end, workerId) {
  return sumRange(start, end, workerId);
}

if (!isMainThread) {
  parentPort.postMessage(runChunk(workerData.start, workerData.end, workerData.workerId));
}

module.exports = {
  runChunk,
};
