function classifyProgress(value, target, warningGap) {
  if (value >= target) {
    return "healthy";
  }

  if (value >= target - warningGap) {
    return "warning";
  }

  return "critical";
}

module.exports = { classifyProgress };
