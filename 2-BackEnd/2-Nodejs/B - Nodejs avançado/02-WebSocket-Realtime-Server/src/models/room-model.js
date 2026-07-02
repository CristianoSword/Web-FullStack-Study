function createRoom(name) {
  return {
    name,
    clients: new Set(),
    history: [],
  };
}

module.exports = {
  createRoom,
};
