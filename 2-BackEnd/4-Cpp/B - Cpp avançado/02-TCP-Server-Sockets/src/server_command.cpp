#include "../include/server_command.hpp"

#include <sstream>
#include <utility>

ServerCommand parseCommand(const std::string& line) {
  if (line.empty()) {
    return {CommandType::Invalid, {}, line};
  }

  if (line[0] != '/') {
    return {CommandType::Broadcast, {}, line};
  }

  std::istringstream stream(line.substr(1));
  std::string name;
  stream >> name;

  std::vector<std::string> arguments;
  for (std::string token; stream >> token;) {
    arguments.push_back(std::move(token));
  }

  if (name == "nick") {
    return {CommandType::Nick, std::move(arguments), line};
  }
  if (name == "who") {
    return {CommandType::Who, std::move(arguments), line};
  }
  if (name == "history") {
    return {CommandType::History, std::move(arguments), line};
  }
  if (name == "quit" || name == "exit") {
    return {CommandType::Quit, std::move(arguments), line};
  }
  if (name == "help") {
    return {CommandType::Help, std::move(arguments), line};
  }

  return {CommandType::Invalid, std::move(arguments), line};
}
