#pragma once

#include "record.hpp"

inline bool isValidRecord(const Record& record) {
  return !record.category.empty() && record.amount >= 0;
}
