#include "../include/chat_server.hpp"
#include "../include/socket_guard.hpp"

#include <cstdlib>
#include <exception>
#include <iostream>
#include <string>

namespace {

void printUsage() {
  std::cout
      << "Usage: tcp_server_sockets [options]\n"
      << "  --host <value>         Bind address (default: 127.0.0.1)\n"
      << "  --port <value>         TCP port (default: 8080)\n"
      << "  --max-clients <value>  Max simultaneous clients (default: 16)\n"
      << "  --backlog <value>      Pending connection backlog (default: 16)\n"
      << "  --buffer-size <value>  Receive buffer size in bytes (default: 1024)\n"
      << "  --validate-config      Validate config and exit\n"
      << "  --help                 Show this message\n";
}

int parseNumber(const std::string& raw, const std::string& flagName) {
  try {
    return std::stoi(raw);
  } catch (const std::exception&) {
    throw std::runtime_error("invalid numeric value for " + flagName);
  }
}

SocketConfig parseArguments(int argc, char* argv[], bool& validateOnly) {
  SocketConfig config{"127.0.0.1", 8080, 16, 16, 1024};
  validateOnly = false;

  for (int index = 1; index < argc; ++index) {
    const std::string argument = argv[index];

    auto requireValue = [&](const std::string& flag) -> std::string {
      if (index + 1 >= argc) {
        throw std::runtime_error("missing value for " + flag);
      }
      return argv[++index];
    };

    if (argument == "--help") {
      printUsage();
      std::exit(0);
    }
    if (argument == "--validate-config") {
      validateOnly = true;
      continue;
    }
    if (argument == "--host") {
      config.host = requireValue(argument);
      continue;
    }
    if (argument == "--port") {
      config.port = parseNumber(requireValue(argument), argument);
      continue;
    }
    if (argument == "--max-clients") {
      config.maxClients = parseNumber(requireValue(argument), argument);
      continue;
    }
    if (argument == "--backlog") {
      config.backlog = parseNumber(requireValue(argument), argument);
      continue;
    }
    if (argument == "--buffer-size") {
      config.bufferSize = parseNumber(requireValue(argument), argument);
      continue;
    }

    throw std::runtime_error("unknown argument: " + argument);
  }

  return config;
}

}  // namespace

int main(int argc, char* argv[]) {
  bool validateOnly = false;
  SocketConfig config{};

  try {
    config = parseArguments(argc, argv, validateOnly);
  } catch (const std::exception& exception) {
    std::cerr << exception.what() << "\n\n";
    printUsage();
    return 1;
  }

  if (!isValidConfig(config)) {
    std::cout << "invalid config\n\n";
    printUsage();
    return 1;
  }

  if (validateOnly) {
    ChatServer server(config);
    server.printSummary();
    std::cout << "configuration is valid\n";
    return 0;
  }

  ChatServer server(config);
  return server.run();
}
