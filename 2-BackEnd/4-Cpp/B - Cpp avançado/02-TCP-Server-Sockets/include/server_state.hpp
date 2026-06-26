#pragma once

#include "chat_message.hpp"

#include <vector>

class ServerState {
 public:
  void push(const ChatMessage& message);
  const std::vector<ChatMessage>& history() const;

 private:
  std::vector<ChatMessage> history_;
};
