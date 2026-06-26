#include "../include/allocator_guard.hpp"
#include "../include/linear_allocator.hpp"

#include <iostream>

int main() {
  if (!canAllocate(256, 64)) {
    std::cout << "invalid allocation\n";
    return 1;
  }

  LinearAllocator allocator(256);
  const auto block = allocator.allocate(64);
  const auto stats = allocator.stats();
  std::cout << "offset: " << block.offset << "\n";
  std::cout << "free: " << stats.freeBytes << "\n";
  return 0;
}
