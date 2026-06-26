#include "../include/parser_guard.hpp"
#include "../include/flat_parser.hpp"

#include <iostream>

int main() {
  constexpr auto payload = R"({"name":"ana","role":"admin"})";
  if (!hasObjectShape(payload)) {
    std::cout << "invalid payload\n";
    return 1;
  }

  const auto result = parseFlatObject(payload);
  std::cout << "tokens: " << result.tokenCount << "\n";
  return 0;
}
