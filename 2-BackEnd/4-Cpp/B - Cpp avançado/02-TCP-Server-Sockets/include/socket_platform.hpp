#pragma once

#ifndef NOMINMAX
#define NOMINMAX
#endif

#include <winsock2.h>
#include <ws2tcpip.h>

#include <cstdint>

using SocketHandle = SOCKET;

constexpr SocketHandle kInvalidSocket = INVALID_SOCKET;
