function classifyRisk(score) {
  if (score >= 90) {
    return "healthy";
  }

  if (score >= 70) {
    return "warning";
  }

  return "critical";
}

function buildCoverageMessage(score) {
  const category = classifyRisk(score);
  return `Coverage ${score}%: ${category}`;
}

module.exports = { classifyRisk, buildCoverageMessage };
