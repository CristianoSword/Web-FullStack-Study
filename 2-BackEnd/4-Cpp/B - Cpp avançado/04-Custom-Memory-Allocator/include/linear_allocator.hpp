#pragma once

#include "allocation_block.hpp"
#include "allocator_stats.hpp"

class LinearAllocator {
 public:
  explicit LinearAllocator(int capacity);
  AllocationBlock allocate(int size);
  AllocatorStats stats() const;

 private:
  int capacity_;
  int used_;
};
