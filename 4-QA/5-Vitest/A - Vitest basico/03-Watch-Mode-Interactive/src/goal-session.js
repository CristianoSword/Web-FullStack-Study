function calculateSessionStatus(completed, total) {
  if (completed >= total) {
    return "done";
  }

  return "in-progress";
}

function createWatchSummary(label, completed, total) {
  return `${label}: ${completed}/${total} (${calculateSessionStatus(completed, total)})`;
}

module.exports = { calculateSessionStatus, createWatchSummary };
