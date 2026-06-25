function buildReportRow(columns) {
  return {
    id: columns[0],
    category: columns[1],
    amount: Number(columns[2] || 0),
  };
}

module.exports = {
  buildReportRow,
};
