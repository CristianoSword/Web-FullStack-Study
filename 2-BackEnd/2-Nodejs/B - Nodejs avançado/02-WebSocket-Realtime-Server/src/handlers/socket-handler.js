const { joinRoom, leaveRoom, broadcast } = require("../services/realtime-hub");

function attachSocket(server, socketServer) {
  socketServer.on("connection", (client) => {
    let currentRoom = "general";
    joinRoom(currentRoom, client);

    client.on("message", (rawMessage) => {
      const payload = JSON.parse(String(rawMessage));
      currentRoom = payload.room || currentRoom;
      joinRoom(currentRoom, client);
      broadcast(currentRoom, payload.author || "anonymous", payload.content || "");
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
