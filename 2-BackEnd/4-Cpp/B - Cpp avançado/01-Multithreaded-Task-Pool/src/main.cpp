#include "../include/task_pool.hpp"
#include "../include/task_guard.hpp"

#include <iostream>

int main() {
  TaskPool pool(2);
  const TaskItem first{1, "render-report", 120};
  const TaskItem second{2, "send-email", 80};
  const TaskItem third{3, "sync-cache", 40};

  if (!isValidTask(first) || !isValidTask(second) || !isValidTask(third)) {
    std::cout << "invalid task\n";
    return 1;
  }

  pool.enqueue(first);
  pool.enqueue(second);
  pool.enqueue(third);
  const auto state = pool.drain();
  std::cout << "queued: " << state.queued << "\n";
  std::cout << "completed: " << state.completed << "\n";
  std::cout << "workers: " << state.workers << "\n";
  return 0;
}
