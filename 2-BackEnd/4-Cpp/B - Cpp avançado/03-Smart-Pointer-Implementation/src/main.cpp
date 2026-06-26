#include "../include/demo_resource.hpp"
#include "../include/shared_like.hpp"
#include "../include/unique_like.hpp"

#include <iostream>

int main() {
  UniqueLike<DemoResource> unique(new DemoResource{"unique"});
  SharedLike<DemoResource> shared(new DemoResource{"shared"});
  std::cout << unique.get()->name << "\n";
  std::cout << shared.get()->name << "\n";
  return 0;
}
