function validateConfig(config) {
  if (!Number.isInteger(config.limit) || config.limit <= 0) {
    throw new Error("Limit must be a positive integer.");
  }

  if (!Number.isInteger(config.chunkSize) || config.chunkSize <= 0) {
    throw new Error("Chunk size must be a positive integer.");
  }

  if (config.chunkSize > config.limit) {
    throw new Error("Chunk size cannot be greater than limit.");
  }

  return config;
}

module.exports = {
  validateConfig,
};
