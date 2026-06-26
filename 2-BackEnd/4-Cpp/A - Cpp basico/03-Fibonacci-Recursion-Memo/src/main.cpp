#include "../include/fib_cache.hpp"
#include "../include/fibonacci_service.hpp"

#include <iostream>

int main(int argc, char** argv) {
  int target = 10;

  if (argc > 1) {
    target = std::stoi(argv[1]);
  }

  FibCache cache;
  std::cout << fibMemo(target, cache) << "\n";
  return 0;
}
