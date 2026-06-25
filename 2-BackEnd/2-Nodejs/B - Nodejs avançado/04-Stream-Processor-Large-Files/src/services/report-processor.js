const { buildReportRow } = require("../models/report-row");
const { createSummary } = require("../types/report-summary");

function processLines(lines) {
  const summary = createSummary();

  for (const line of lines) {
    const row = buildReportRow(line.split(","));
    summary.totalRows += 1;
    summary.totalAmount += row.amount;
  }

  return summary;
}

module.exports = {
  processLines,
};
