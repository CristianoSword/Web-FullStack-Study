function createRoom(name) {
  return {
    name,
    clients: new Set(),
  };
}

module.exports = {
  createRoom,
};
