const { processLines } = require("../services/report-processor");
const { validateLines } = require("../validators/report-validator");

function runReport(sampleLines) {
  return processLines(validateLines(sampleLines));
}

module.exports = {
  runReport,
};
