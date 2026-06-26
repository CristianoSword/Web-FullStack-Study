#include "../include/task_pool.hpp"

void TaskPool::enqueue(const TaskItem& task) {
  tasks_.push(task);
}

PoolState TaskPool::drain() {
  PoolState state{static_cast<int>(tasks_.size()), 0};

  while (!tasks_.empty()) {
    tasks_.pop();
    state.completed += 1;
  }

  return state;
}
