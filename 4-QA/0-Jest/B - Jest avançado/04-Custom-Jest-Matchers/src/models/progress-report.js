function createProgressReport(track, completed, total) {
  return {
    track,
    completed,
    total,
    progress: Number(((completed / total) * 100).toFixed(1))
  };
}

module.exports = {
  createProgressReport
};
