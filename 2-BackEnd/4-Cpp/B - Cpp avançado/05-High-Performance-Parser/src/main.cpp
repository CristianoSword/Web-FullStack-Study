#include "../include/flat_parser.hpp"

#include <iostream>

int main() {
  const auto result = parseFlatObject(R"({"name":"ana","role":"admin"})");
  std::cout << "tokens: " << result.tokenCount << "\n";
  return 0;
}
