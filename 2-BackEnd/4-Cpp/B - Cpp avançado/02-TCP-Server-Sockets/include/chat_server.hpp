#pragma once

#include "server_state.hpp"
#include "socket_config.hpp"

class ChatServer {
 public:
  explicit ChatServer(SocketConfig config);
  int run();
  void printSummary() const;

 private:
  SocketConfig config_;
  ServerState state_;
};
