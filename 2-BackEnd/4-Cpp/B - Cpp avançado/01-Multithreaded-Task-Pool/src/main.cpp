#include "../include/task_pool.hpp"

#include <iostream>

int main() {
  TaskPool pool;
  pool.enqueue({1, "render-report"});
  pool.enqueue({2, "send-email"});
  const auto state = pool.drain();
  std::cout << "queued: " << state.queued << "\n";
  std::cout << "completed: " << state.completed << "\n";
  return 0;
}
