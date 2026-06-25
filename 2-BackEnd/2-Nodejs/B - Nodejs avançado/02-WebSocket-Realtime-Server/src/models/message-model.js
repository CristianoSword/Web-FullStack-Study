function createMessage(room, author, content) {
  return {
    room,
    author,
    content,
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  createMessage,
};
