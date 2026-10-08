#pragma once

#include <string>

struct SocketConfig {
  std::string host;
  int port;
  int maxClients;
  int backlog;
  int bufferSize;
};
