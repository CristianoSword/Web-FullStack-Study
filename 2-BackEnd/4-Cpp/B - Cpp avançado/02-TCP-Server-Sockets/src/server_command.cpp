#include "../include/server_command.hpp"

ServerCommand parseCommand(const std::string& line) {
  return {CommandType::Broadcast, {}, line};
}
