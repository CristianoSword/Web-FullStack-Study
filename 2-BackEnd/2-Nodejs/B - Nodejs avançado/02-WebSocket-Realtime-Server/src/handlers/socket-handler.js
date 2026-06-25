const { joinRoom, leaveRoom, broadcast } = require("../services/realtime-hub");
const { validateMessage } = require("../validators/message-validator");

function attachSocket(server, socketServer) {
  socketServer.on("connection", (client) => {
    let currentRoom = "general";
    joinRoom(currentRoom, client);

    client.on("message", (rawMessage) => {
      const payload = validateMessage(JSON.parse(String(rawMessage)));
      currentRoom = payload.room || currentRoom;
      joinRoom(currentRoom, client);
      broadcast(currentRoom, payload.author, payload.content);
    });

    client.on("close", () => {
      leaveRoom(currentRoom, client);
    });
  });

  return server;
}

module.exports = {
  attachSocket,
};
