#include "../include/fibonacci_service.hpp"

unsigned long long fibMemo(int index, FibCache& cache) {
  if (index <= 1) {
    return static_cast<unsigned long long>(index);
  }

  if (cache.count(index) > 0) {
    return cache.at(index);
  }

  cache[index] = fibMemo(index - 1, cache) + fibMemo(index - 2, cache);
  return cache[index];
}
