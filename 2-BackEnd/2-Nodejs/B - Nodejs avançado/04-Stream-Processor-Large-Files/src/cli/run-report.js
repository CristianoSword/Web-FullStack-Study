const { processLines } = require("../services/report-processor");

function runReport(sampleLines) {
  return processLines(sampleLines);
}

module.exports = {
  runReport,
};
