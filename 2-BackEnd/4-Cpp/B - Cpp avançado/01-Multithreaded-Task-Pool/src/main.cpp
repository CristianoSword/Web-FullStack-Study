#include "../include/task_pool.hpp"
#include "../include/task_guard.hpp"

#include <iostream>

int main() {
  TaskPool pool;
  const TaskItem first{1, "render-report"};
  const TaskItem second{2, "send-email"};

  if (!isValidTask(first) || !isValidTask(second)) {
    std::cout << "invalid task\n";
    return 1;
  }

  pool.enqueue(first);
  pool.enqueue(second);
  const auto state = pool.drain();
  std::cout << "queued: " << state.queued << "\n";
  std::cout << "completed: " << state.completed << "\n";
  return 0;
}
