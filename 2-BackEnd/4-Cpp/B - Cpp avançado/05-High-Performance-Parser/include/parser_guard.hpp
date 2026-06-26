#pragma once

#include <string_view>

inline bool hasObjectShape(std::string_view payload) {
  return payload.find('{') != std::string_view::npos && payload.find('}') != std::string_view::npos;
}
