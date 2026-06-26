#pragma once

inline bool canAllocate(int capacity, int size) {
  return capacity > 0 && size > 0 && size <= capacity;
}
