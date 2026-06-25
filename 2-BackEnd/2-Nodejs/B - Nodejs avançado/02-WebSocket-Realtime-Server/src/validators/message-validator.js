function validateMessage(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object.");
  }

  if (!String(payload.room || "").trim()) {
    throw new Error("Room is required.");
  }

  if (!String(payload.content || "").trim()) {
    throw new Error("Content is required.");
  }

  return {
    room: String(payload.room).trim(),
    author: String(payload.author || "anonymous").trim(),
    content: String(payload.content).trim(),
  };
}

module.exports = {
  validateMessage,
};
