#pragma once

#include <string>

struct ChatMessage {
  std::string author;
  std::string body;
  std::string timestamp;
  bool system;
};
