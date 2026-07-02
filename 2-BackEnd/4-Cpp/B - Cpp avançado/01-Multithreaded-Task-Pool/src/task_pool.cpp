#include "../include/task_pool.hpp"

#include <chrono>

TaskPool::TaskPool(std::size_t workerCount) {
  for (std::size_t index = 0; index < workerCount; ++index) {
    workers_.emplace_back(&TaskPool::workerLoop, this);
  }
}

TaskPool::~TaskPool() {
  {
    std::lock_guard<std::mutex> lock(mutex_);
    stopping_ = true;
  }

  workReady_.notify_all();

  for (auto& worker : workers_) {
    if (worker.joinable()) {
      worker.join();
    }
  }
}

void TaskPool::enqueue(const TaskItem& task) {
  {
    std::lock_guard<std::mutex> lock(mutex_);
    tasks_.push(task);
  }

  workReady_.notify_one();
}

PoolState TaskPool::drain() {
  std::unique_lock<std::mutex> lock(mutex_);
  idle_.wait(lock, [this]() { return tasks_.empty() && activeTasks_ == 0; });
  return PoolState{0, completedTasks_, static_cast<int>(workers_.size())};
}

void TaskPool::workerLoop() {
  while (true) {
    TaskItem task;

    {
      std::unique_lock<std::mutex> lock(mutex_);
      workReady_.wait(lock, [this]() { return stopping_ || !tasks_.empty(); });

      if (stopping_ && tasks_.empty()) {
        return;
      }

      task = tasks_.front();
      tasks_.pop();
      activeTasks_ += 1;
    }

    std::this_thread::sleep_for(std::chrono::milliseconds(task.durationMs));

    {
      std::lock_guard<std::mutex> lock(mutex_);
      activeTasks_ -= 1;
      completedTasks_ += 1;
      if (tasks_.empty() && activeTasks_ == 0) {
        idle_.notify_all();
      }
    }
  }
}
