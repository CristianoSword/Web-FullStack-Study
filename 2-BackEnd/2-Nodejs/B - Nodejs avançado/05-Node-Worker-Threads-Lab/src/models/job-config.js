function createJobConfig(limit, chunkSize) {
  return {
    limit,
    chunkSize,
  };
}

function createRanges(limit, chunkSize) {
  const ranges = [];
  let workerId = 1;

  for (let start = 1; start <= limit; start += chunkSize) {
    ranges.push({
      workerId,
      start,
      end: Math.min(limit, start + chunkSize - 1),
    });
    workerId += 1;
  }

  return ranges;
}

module.exports = {
  createJobConfig,
  createRanges,
};
