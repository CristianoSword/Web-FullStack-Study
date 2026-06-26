#include "../include/server_state.hpp"

void ServerState::push(const ChatMessage& message) {
  history_.push_back(message);
}

const std::vector<ChatMessage>& ServerState::history() const {
  return history_;
}
