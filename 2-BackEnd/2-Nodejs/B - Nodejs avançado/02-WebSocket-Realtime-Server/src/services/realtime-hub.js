const { WebSocket } = require("ws");
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

  if (room.clients.size === 0 && room.history.length === 0) {
    rooms.delete(roomName);
  }
}

function broadcast(roomName, author, content, type = "message") {
  const room = ensureRoom(roomName);
  const message = createMessage(roomName, author, content, type);
  room.history.push(message);

  if (room.history.length > 20) {
    room.history.shift();
  }

  for (const client of room.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }

  return message;
}

function snapshotRooms() {
  return Array.from(rooms.values()).map((room) => ({
    name: room.name,
    connectedClients: room.clients.size,
    bufferedMessages: room.history.length,
  }));
}

module.exports = {
  joinRoom,
  leaveRoom,
  broadcast,
  snapshotRooms,
};
