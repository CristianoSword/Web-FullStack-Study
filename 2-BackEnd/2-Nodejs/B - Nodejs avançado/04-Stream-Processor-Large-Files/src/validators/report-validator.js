function validateLines(lines) {
  return lines.filter((line) => {
    const columns = line.split(",");
    return columns.length === 3 && Number.isFinite(Number(columns[2]));
  });
}

module.exports = {
  validateLines,
};
