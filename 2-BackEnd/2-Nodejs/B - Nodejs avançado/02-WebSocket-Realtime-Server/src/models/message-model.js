function createMessage(room, author, content, type = "message") {
  return {
    type,
    room,
    author,
    content,
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  createMessage,
};
