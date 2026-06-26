#pragma once

#include "pool_state.hpp"
#include "task_item.hpp"

#include <queue>
#include <vector>

class TaskPool {
 public:
  void enqueue(const TaskItem& task);
  PoolState drain();

 private:
  std::queue<TaskItem> tasks_;
};
