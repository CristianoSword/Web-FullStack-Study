#include "../include/server_state.hpp"

#include <utility>

void ServerState::push(const ChatMessage& message) {
  std::lock_guard<std::mutex> lock(mutex_);
  history_.push_back(message);
}

std::vector<ChatMessage> ServerState::history() const {
  std::lock_guard<std::mutex> lock(mutex_);
  return history_;
}

void ServerState::addClient(const ClientSession& client) {
  std::lock_guard<std::mutex> lock(mutex_);
  clients_[client.id] = client;
}

void ServerState::removeClient(int clientId) {
  std::lock_guard<std::mutex> lock(mutex_);
  clients_.erase(clientId);
}

bool ServerState::renameClient(int clientId, const std::string& nickname) {
  std::lock_guard<std::mutex> lock(mutex_);
  const auto iterator = clients_.find(clientId);
  if (iterator == clients_.end()) {
    return false;
  }

  iterator->second.nickname = nickname;
  return true;
}

std::optional<ClientSession> ServerState::getClient(int clientId) const {
  std::lock_guard<std::mutex> lock(mutex_);
  const auto iterator = clients_.find(clientId);
  if (iterator == clients_.end()) {
    return std::nullopt;
  }

  return iterator->second;
}

std::vector<ClientSession> ServerState::clients() const {
  std::lock_guard<std::mutex> lock(mutex_);
  std::vector<ClientSession> snapshot;
  snapshot.reserve(clients_.size());
  for (const auto& [id, client] : clients_) {
    snapshot.push_back(client);
  }
  return snapshot;
}

bool ServerState::hasCapacity(int maxClients) const {
  std::lock_guard<std::mutex> lock(mutex_);
  return static_cast<int>(clients_.size()) < maxClients;
}

std::size_t ServerState::clientCount() const {
  std::lock_guard<std::mutex> lock(mutex_);
  return clients_.size();
}
