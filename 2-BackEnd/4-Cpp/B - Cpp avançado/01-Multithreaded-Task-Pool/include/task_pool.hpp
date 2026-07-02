#pragma once

#include "pool_state.hpp"
#include "task_item.hpp"

#include <condition_variable>
#include <cstddef>
#include <mutex>
#include <queue>
#include <thread>
#include <vector>

class TaskPool {
 public:
  explicit TaskPool(std::size_t workerCount = 2);
  ~TaskPool();
  void enqueue(const TaskItem& task);
  PoolState drain();

 private:
  void workerLoop();

  std::queue<TaskItem> tasks_;
  std::mutex mutex_;
  std::condition_variable workReady_;
  std::condition_variable idle_;
  std::vector<std::thread> workers_;
  bool stopping_ = false;
  int activeTasks_ = 0;
  int completedTasks_ = 0;
};
