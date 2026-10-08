#include "../include/socket_guard.hpp"

#include <stdexcept>
#include <utility>

WsaRuntimeGuard::WsaRuntimeGuard() {
  WSADATA data{};
  if (WSAStartup(MAKEWORD(2, 2), &data) != 0) {
    throw std::runtime_error("failed to initialize WinSock");
  }
  active_ = true;
}

WsaRuntimeGuard::~WsaRuntimeGuard() {
  if (active_) {
    WSACleanup();
  }
}

SocketHandleGuard::SocketHandleGuard(SocketHandle socket) : socket_(socket) {}

SocketHandleGuard::~SocketHandleGuard() {
  reset();
}

SocketHandleGuard::SocketHandleGuard(SocketHandleGuard&& other) noexcept
    : socket_(other.release()) {}

SocketHandleGuard& SocketHandleGuard::operator=(
    SocketHandleGuard&& other) noexcept {
  if (this != &other) {
    reset(other.release());
  }
  return *this;
}

SocketHandle SocketHandleGuard::get() const {
  return socket_;
}

SocketHandle SocketHandleGuard::release() {
  SocketHandle current = socket_;
  socket_ = kInvalidSocket;
  return current;
}

void SocketHandleGuard::reset(SocketHandle socket) {
  if (socket_ != kInvalidSocket) {
    closesocket(socket_);
  }
  socket_ = socket;
}
