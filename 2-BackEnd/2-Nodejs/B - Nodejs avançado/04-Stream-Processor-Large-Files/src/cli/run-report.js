const { processLines } = require("../services/report-processor");

function runReport(filePath) {
  return processLines(filePath);
}

module.exports = {
  runReport,
};
