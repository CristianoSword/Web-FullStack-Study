const { createRoom } = require("../models/room-model");
const { createMessage } = require("../models/message-model");

const rooms = new Map();

function ensureRoom(name) {
  if (!rooms.has(name)) {
    rooms.set(name, createRoom(name));
  }

  return rooms.get(name);
}

function joinRoom(roomName, client) {
  const room = ensureRoom(roomName);
  room.clients.add(client);
  return room;
}

function leaveRoom(roomName, client) {
  const room = rooms.get(roomName);

  if (!room) {
    return;
  }

  room.clients.delete(client);
}

function broadcast(roomName, author, content) {
  const room = ensureRoom(roomName);
  const message = createMessage(roomName, author, content);

  for (const client of room.clients) {
    client.send(JSON.stringify(message));
  }

  return message;
}

module.exports = {
  joinRoom,
  leaveRoom,
  broadcast,
};
