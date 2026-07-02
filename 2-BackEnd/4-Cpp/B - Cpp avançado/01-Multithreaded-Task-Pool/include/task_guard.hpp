#pragma once

#include "task_item.hpp"

inline bool isValidTask(const TaskItem& task) {
  return task.id > 0 && !task.label.empty() && task.durationMs > 0;
}
