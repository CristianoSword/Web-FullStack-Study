function buildResponse(message, data = null) {
  return {
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  buildResponse,
};
