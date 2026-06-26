#pragma once

#include <string_view>

struct TokenView {
  std::string_view key;
  std::string_view value;
};
