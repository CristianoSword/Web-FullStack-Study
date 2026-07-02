const {
  joinRoom,
  leaveRoom,
  broadcast,
  snapshotRooms,
} = require("../services/realtime-hub");
const { validateMessage } = require("../validators/message-validator");

function sendPayload(client, payload) {
  if (client.readyState === 1) {
    client.send(JSON.stringify(payload));
  }
}

function attachSocket(socketServer) {
  socketServer.on("connection", (client) => {
    let currentRoom = "general";
    joinRoom(currentRoom, client);
    sendPayload(client, {
      type: "welcome",
      room: currentRoom,
      rooms: snapshotRooms(),
    });
    broadcast(currentRoom, "system", "A participant joined the room.", "system");

    client.on("message", (rawMessage) => {
      try {
        const payload = validateMessage(JSON.parse(String(rawMessage)));

        if (payload.room !== currentRoom) {
          leaveRoom(currentRoom, client);
          currentRoom = payload.room;
          joinRoom(currentRoom, client);
          sendPayload(client, {
            type: "joined",
            room: currentRoom,
            rooms: snapshotRooms(),
          });
        }

        broadcast(currentRoom, payload.author, payload.content, "message");
      } catch (error) {
        sendPayload(client, {
          type: "error",
          message: error.message,
        });
      }
    });

    client.on("close", () => {
      leaveRoom(currentRoom, client);
      broadcast(currentRoom, "system", "A participant left the room.", "system");
    });
  });

  return socketServer;
}

module.exports = {
  attachSocket,
};
