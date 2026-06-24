function guardMethod(method) {
  const allowed = ["GET"];

  if (!allowed.includes(method)) {
    return {
      statusCode: 405,
      payload: {
        message: "Method not allowed",
        data: { allowed },
        timestamp: new Date().toISOString(),
      },
    };
  }

  return null;
}

module.exports = {
  guardMethod,
};
