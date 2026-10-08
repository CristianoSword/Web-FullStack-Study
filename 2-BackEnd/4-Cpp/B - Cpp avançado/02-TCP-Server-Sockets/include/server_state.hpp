#pragma once

#include "client_session.hpp"
#include "chat_message.hpp"

#include <mutex>
#include <optional>
#include <unordered_map>
#include <vector>

class ServerState {
 public:
  void push(const ChatMessage& message);
  std::vector<ChatMessage> history() const;

  void addClient(const ClientSession& client);
  void removeClient(int clientId);
  bool renameClient(int clientId, const std::string& nickname);
  std::optional<ClientSession> getClient(int clientId) const;
  std::vector<ClientSession> clients() const;
  bool hasCapacity(int maxClients) const;
  std::size_t clientCount() const;

 private:
  mutable std::mutex mutex_;
  std::vector<ChatMessage> history_;
  std::unordered_map<int, ClientSession> clients_;
};
