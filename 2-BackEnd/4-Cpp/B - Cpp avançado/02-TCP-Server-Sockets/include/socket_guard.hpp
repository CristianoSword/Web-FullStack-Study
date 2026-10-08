#pragma once

#include "socket_platform.hpp"
#include "socket_config.hpp"

inline bool isValidConfig(const SocketConfig& config) {
  return !config.host.empty() &&
         config.port > 0 &&
         config.maxClients > 0 &&
         config.backlog > 0 &&
         config.bufferSize >= 256;
}

class WsaRuntimeGuard {
 public:
  WsaRuntimeGuard();
  ~WsaRuntimeGuard();

  WsaRuntimeGuard(const WsaRuntimeGuard&) = delete;
  WsaRuntimeGuard& operator=(const WsaRuntimeGuard&) = delete;

 private:
  bool active_{false};
};

class SocketHandleGuard {
 public:
  explicit SocketHandleGuard(SocketHandle socket = kInvalidSocket);
  ~SocketHandleGuard();

  SocketHandleGuard(const SocketHandleGuard&) = delete;
  SocketHandleGuard& operator=(const SocketHandleGuard&) = delete;

  SocketHandleGuard(SocketHandleGuard&& other) noexcept;
  SocketHandleGuard& operator=(SocketHandleGuard&& other) noexcept;

  SocketHandle get() const;
  SocketHandle release();
  void reset(SocketHandle socket = kInvalidSocket);

 private:
  SocketHandle socket_;
};
