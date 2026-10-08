#pragma once

#include <string>
#include <vector>

enum class CommandType {
  Broadcast,
  Nick,
  Who,
  History,
  Quit,
  Help,
  Invalid
};

struct ServerCommand {
  CommandType type;
  std::vector<std::string> arguments;
  std::string raw;
};

ServerCommand parseCommand(const std::string& line);
