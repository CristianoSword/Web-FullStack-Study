#include "../include/server_state.hpp"

#include <iostream>

int main() {
  ServerState state;
  state.push({"system", "server booted"});
  for (const auto& message : state.history()) {
    std::cout << message.author << ": " << message.body << "\n";
  }
  return 0;
}
