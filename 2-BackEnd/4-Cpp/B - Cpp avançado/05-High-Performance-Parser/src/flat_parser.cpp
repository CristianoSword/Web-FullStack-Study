#include "../include/flat_parser.hpp"

ParseResult parseFlatObject(std::string_view payload) {
  int tokenCount = 0;
  for (const char ch : payload) {
    if (ch == ':') {
      tokenCount += 1;
    }
  }

  return {tokenCount, tokenCount > 0};
}
