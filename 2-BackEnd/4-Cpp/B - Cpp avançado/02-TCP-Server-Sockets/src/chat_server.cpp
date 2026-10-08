#include "../include/chat_server.hpp"

#include "../include/server_command.hpp"
#include "../include/socket_guard.hpp"

#include <algorithm>
#include <chrono>
#include <cctype>
#include <ctime>
#include <iomanip>
#include <iostream>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <thread>
#include <utility>

namespace {

std::string trim(std::string value) {
  auto notSpace = [](unsigned char character) {
    return !std::isspace(character);
  };

  value.erase(value.begin(),
              std::find_if(value.begin(), value.end(), notSpace));
  value.erase(
      std::find_if(value.rbegin(), value.rend(), notSpace).base(), value.end());
  return value;
}

std::string timestampNow() {
  const auto now = std::chrono::system_clock::now();
  const std::time_t clock = std::chrono::system_clock::to_time_t(now);
  std::tm localTime{};
  localtime_s(&localTime, &clock);

  std::ostringstream stream;
  stream << std::put_time(&localTime, "%Y-%m-%d %H:%M:%S");
  return stream.str();
}

std::string formatMessage(const ChatMessage& message) {
  std::ostringstream stream;
  stream << '[' << message.timestamp << "] ";
  if (message.system) {
    stream << "[system] " << message.body;
  } else {
    stream << message.author << ": " << message.body;
  }
  return stream.str();
}

std::string joinArguments(const std::vector<std::string>& arguments) {
  std::ostringstream stream;
  for (std::size_t index = 0; index < arguments.size(); ++index) {
    if (index > 0) {
      stream << ' ';
    }
    stream << arguments[index];
  }
  return stream.str();
}

bool isNicknameValid(const std::string& nickname) {
  if (nickname.size() < 3 || nickname.size() > 20) {
    return false;
  }

  return std::all_of(
      nickname.begin(), nickname.end(), [](unsigned char character) {
        return std::isalnum(character) || character == '-' || character == '_';
      });
}

std::string defaultNickname(int clientId) {
  return "guest-" + std::to_string(clientId);
}

std::string formatEndpoint(const sockaddr_in& address) {
  char ipBuffer[INET_ADDRSTRLEN]{};
  inet_ntop(AF_INET, &address.sin_addr, ipBuffer, sizeof(ipBuffer));

  std::ostringstream stream;
  stream << ipBuffer << ':' << ntohs(address.sin_port);
  return stream.str();
}

std::size_t parseHistoryLimit(const std::vector<std::string>& arguments) {
  if (arguments.empty()) {
    return 10;
  }

  try {
    const int parsed = std::stoi(arguments.front());
    if (parsed <= 0) {
      return 10;
    }
    return static_cast<std::size_t>(parsed);
  } catch (...) {
    return 10;
  }
}

std::string lastSocketError() {
  return "WSA error " + std::to_string(WSAGetLastError());
}

}  // namespace

ChatServer::ChatServer(SocketConfig config) : config_(std::move(config)) {}

int ChatServer::run() {
  if (!isValidConfig(config_)) {
    std::cerr << "invalid configuration\n";
    return 1;
  }

  try {
    WsaRuntimeGuard wsa;
    SocketHandleGuard listenSocket(createListenSocket());
    printSummary();
    acceptLoop(listenSocket.get());
    return 0;
  } catch (const std::exception& exception) {
    std::cerr << "server failed: " << exception.what() << '\n';
    return 1;
  }
}

SocketHandle ChatServer::createListenSocket() const {
  addrinfo hints{};
  hints.ai_family = AF_INET;
  hints.ai_socktype = SOCK_STREAM;
  hints.ai_protocol = IPPROTO_TCP;

  const bool passive = config_.host == "0.0.0.0" || config_.host == "*";
  hints.ai_flags = passive ? AI_PASSIVE : 0;

  addrinfo* result = nullptr;
  const std::string port = std::to_string(config_.port);
  const char* node = passive ? nullptr : config_.host.c_str();

  if (getaddrinfo(node, port.c_str(), &hints, &result) != 0) {
    throw std::runtime_error("getaddrinfo failed");
  }

  std::unique_ptr<addrinfo, decltype(&freeaddrinfo)> addresses(result,
                                                                &freeaddrinfo);

  for (addrinfo* current = addresses.get(); current != nullptr;
       current = current->ai_next) {
    SocketHandleGuard socket(::socket(current->ai_family, current->ai_socktype,
                                      current->ai_protocol));
    if (socket.get() == kInvalidSocket) {
      continue;
    }

    const char reuse = 1;
    setsockopt(socket.get(), SOL_SOCKET, SO_REUSEADDR, &reuse, sizeof(reuse));

    if (::bind(socket.get(), current->ai_addr,
               static_cast<int>(current->ai_addrlen)) == SOCKET_ERROR) {
      continue;
    }

    if (::listen(socket.get(), config_.backlog) == SOCKET_ERROR) {
      throw std::runtime_error("listen failed: " + lastSocketError());
    }

    return socket.release();
  }

  throw std::runtime_error("unable to bind on " + config_.host + ":" +
                           std::to_string(config_.port));
}

void ChatServer::acceptLoop(SocketHandle listenSocket) {
  for (;;) {
    sockaddr_in clientAddress{};
    int addressLength = sizeof(clientAddress);
    const SocketHandle clientSocket =
        ::accept(listenSocket, reinterpret_cast<sockaddr*>(&clientAddress),
                 &addressLength);

    if (clientSocket == kInvalidSocket) {
      std::cerr << "accept failed: " << lastSocketError() << '\n';
      continue;
    }

    const std::string endpoint = formatEndpoint(clientAddress);
    if (!state_.hasCapacity(config_.maxClients)) {
      sendLine(clientSocket, "Server full. Try again later.");
      closesocket(clientSocket);
      continue;
    }

    std::thread(&ChatServer::handleClient, this, clientSocket, endpoint).detach();
  }
}

void ChatServer::handleClient(SocketHandle clientSocket,
                              const std::string& endpoint) {
  SocketHandleGuard clientHandle(clientSocket);
  const int clientId = nextClientId_.fetch_add(1);
  const std::string connectedAt = timestampNow();
  const std::string nickname = defaultNickname(clientId);

  state_.addClient({clientId, static_cast<std::uintptr_t>(clientSocket), nickname,
                    endpoint, connectedAt});

  const ChatMessage joined{
      "system", nickname + " joined from " + endpoint, connectedAt, true};
  state_.push(joined);
  broadcastLine(formatMessage(joined));

  sendLine(clientHandle.get(), "Welcome to the TCP chat server.");
  sendLine(clientHandle.get(),
           "Commands: /nick <name>, /who, /history [n], /help, /quit");
  sendLine(clientHandle.get(), "You are connected as " + nickname + '.');

  std::string pending;
  std::string disconnectedNickname = nickname;
  std::vector<char> buffer(static_cast<std::size_t>(config_.bufferSize), '\0');

  bool keepRunning = true;
  while (keepRunning) {
    const int received =
        recv(clientHandle.get(), buffer.data(), static_cast<int>(buffer.size()), 0);
    if (received == 0) {
      break;
    }
    if (received == SOCKET_ERROR) {
      std::cerr << "recv failed for " << endpoint << ": " << lastSocketError()
                << '\n';
      break;
    }

    pending.append(buffer.data(), static_cast<std::size_t>(received));

    std::size_t delimiter = pending.find('\n');
    while (delimiter != std::string::npos) {
      std::string line = trim(pending.substr(0, delimiter));
      pending.erase(0, delimiter + 1);

      if (!line.empty()) {
        keepRunning = processLine(clientId, clientHandle.get(), line);
        if (const auto client = state_.getClient(clientId); client.has_value()) {
          disconnectedNickname = client->nickname;
        }
        if (!keepRunning) {
          break;
        }
      }

      delimiter = pending.find('\n');
    }
  }

  state_.removeClient(clientId);
  const ChatMessage left{"system",
                         disconnectedNickname + " left the chat",
                         timestampNow(),
                         true};
  state_.push(left);
  broadcastLine(formatMessage(left));
}

bool ChatServer::processLine(int clientId,
                             SocketHandle clientSocket,
                             const std::string& line) {
  const ServerCommand command = parseCommand(line);
  const auto client = state_.getClient(clientId);
  if (!client.has_value()) {
    return false;
  }

  switch (command.type) {
    case CommandType::Broadcast: {
      const ChatMessage message{client->nickname, command.raw, timestampNow(),
                                false};
      state_.push(message);
      broadcastLine(formatMessage(message));
      return true;
    }
    case CommandType::Nick: {
      const std::string nickname = joinArguments(command.arguments);
      if (!isNicknameValid(nickname)) {
        sendLine(clientSocket,
                 "Nickname must be 3-20 chars with letters, numbers, _ or -.");
        return true;
      }

      for (const auto& other : state_.clients()) {
        if (other.id != clientId && other.nickname == nickname) {
          sendLine(clientSocket, "Nickname already in use.");
          return true;
        }
      }

      const std::string previous = client->nickname;
      state_.renameClient(clientId, nickname);
      sendLine(clientSocket, "Nickname updated to " + nickname + '.');

      const ChatMessage renamed{"system",
                                previous + " is now known as " + nickname,
                                timestampNow(),
                                true};
      state_.push(renamed);
      broadcastLine(formatMessage(renamed));
      return true;
    }
    case CommandType::Who:
      sendClientList(clientSocket);
      return true;
    case CommandType::History:
      sendHistory(clientSocket, parseHistoryLimit(command.arguments));
      return true;
    case CommandType::Help:
      sendLine(clientSocket,
               "Commands: /nick <name>, /who, /history [n], /help, /quit");
      sendLine(clientSocket,
               "Plain text messages are broadcast to all connected clients.");
      return true;
    case CommandType::Quit:
      sendLine(clientSocket, "Disconnecting from server.");
      return false;
    case CommandType::Invalid:
      sendLine(clientSocket, "Unknown command. Use /help for the command list.");
      return true;
  }

  return true;
}

void ChatServer::sendLine(SocketHandle clientSocket,
                          const std::string& message) const {
  std::string payload = message + "\r\n";
  const char* cursor = payload.c_str();
  int remaining = static_cast<int>(payload.size());

  while (remaining > 0) {
    const int sent = send(clientSocket, cursor, remaining, 0);
    if (sent == SOCKET_ERROR) {
      return;
    }

    cursor += sent;
    remaining -= sent;
  }
}

void ChatServer::sendClientList(SocketHandle clientSocket) const {
  const auto clients = state_.clients();
  sendLine(clientSocket,
           "Connected users: " + std::to_string(clients.size()));
  for (const auto& client : clients) {
    sendLine(clientSocket, "- " + client.nickname + " (" + client.endpoint + ")");
  }
}

void ChatServer::sendHistory(SocketHandle clientSocket, std::size_t limit) const {
  const auto history = state_.history();
  if (history.empty()) {
    sendLine(clientSocket, "History is empty.");
    return;
  }

  const std::size_t safeLimit = std::min(limit, history.size());
  sendLine(clientSocket,
           "Recent messages: " + std::to_string(safeLimit));

  const std::size_t offset = history.size() - safeLimit;
  for (std::size_t index = offset; index < history.size(); ++index) {
    sendLine(clientSocket, formatMessage(history[index]));
  }
}

void ChatServer::broadcastLine(const std::string& message) const {
  for (const auto& client : state_.clients()) {
    sendLine(static_cast<SocketHandle>(client.socketValue), message);
  }
}

void ChatServer::printSummary() const {
  std::cout << "TCP chat server listening on " << config_.host << ':'
            << config_.port << " (max clients: " << config_.maxClients
            << ", buffer: " << config_.bufferSize << " bytes)\n";
}
