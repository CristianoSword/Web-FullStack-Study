function buildStudySummary(track, completed, total) {
  return {
    track,
    completed,
    total,
    progress: Number(((completed / total) * 100).toFixed(1))
  };
}

module.exports = {
  buildStudySummary
};
