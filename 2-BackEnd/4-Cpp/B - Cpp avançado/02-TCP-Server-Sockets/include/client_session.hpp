#pragma once

#include <cstdint>
#include <string>

struct ClientSession {
  int id;
  std::uintptr_t socketValue;
  std::string nickname;
  std::string endpoint;
  std::string connectedAt;
};
