function buildReportRow(columns) {
  return {
    id: String(columns[0] || "").trim(),
    category: String(columns[1] || "").trim(),
    amount: Number(columns[2] || 0),
  };
}

module.exports = {
  buildReportRow,
};
