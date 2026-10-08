#include "../include/chat_server.hpp"

#include <iostream>
#include <utility>

ChatServer::ChatServer(SocketConfig config) : config_(std::move(config)) {}

int ChatServer::run() {
  std::cout << "chat server bootstrap ready\n";
  printSummary();
  return 0;
}

void ChatServer::printSummary() const {
  std::cout << "listening on " << config_.host << ':' << config_.port << '\n';
}
