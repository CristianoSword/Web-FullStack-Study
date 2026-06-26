#pragma once

#include "socket_config.hpp"

inline bool isValidConfig(const SocketConfig& config) {
  return config.port > 0 && config.maxClients > 0;
}
