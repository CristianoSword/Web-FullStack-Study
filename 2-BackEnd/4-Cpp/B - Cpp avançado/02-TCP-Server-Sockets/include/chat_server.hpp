#pragma once

#include "server_state.hpp"
#include "socket_config.hpp"
#include "socket_platform.hpp"

#include <atomic>
#include <string>

class ChatServer {
 public:
  explicit ChatServer(SocketConfig config);
  int run();
  void printSummary() const;

 private:
  SocketHandle createListenSocket() const;
  void acceptLoop(SocketHandle listenSocket);
  void handleClient(SocketHandle clientSocket, const std::string& endpoint);
  bool processLine(int clientId, SocketHandle clientSocket, const std::string& line);
  void sendLine(SocketHandle clientSocket, const std::string& message) const;
  void sendClientList(SocketHandle clientSocket) const;
  void sendHistory(SocketHandle clientSocket, std::size_t limit) const;
  void broadcastLine(const std::string& message) const;

  SocketConfig config_;
  ServerState state_;
  std::atomic<int> nextClientId_{1};
};
