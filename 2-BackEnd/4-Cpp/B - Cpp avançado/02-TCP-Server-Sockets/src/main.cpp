#include "../include/server_state.hpp"
#include "../include/socket_guard.hpp"

#include <iostream>

int main() {
  const SocketConfig config{8080, 16};
  if (!isValidConfig(config)) {
    std::cout << "invalid config\n";
    return 1;
  }

  ServerState state;
  state.push({"system", "server booted"});
  for (const auto& message : state.history()) {
    std::cout << message.author << ": " << message.body << "\n";
  }
  return 0;
}
