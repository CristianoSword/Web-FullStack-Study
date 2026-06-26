#include "../include/linear_allocator.hpp"

LinearAllocator::LinearAllocator(int capacity) : capacity_(capacity), used_(0) {}

AllocationBlock LinearAllocator::allocate(int size) {
  AllocationBlock block{used_, size};
  used_ += size;
  return block;
}

AllocatorStats LinearAllocator::stats() const {
  return {used_, capacity_ - used_};
}
