function createJobConfig(limit, chunkSize) {
  return {
    limit,
    chunkSize,
  };
}

module.exports = {
  createJobConfig,
};
