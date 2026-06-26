#pragma once

#include <string>

inline bool isValidStudentName(const std::string& name) {
  return !name.empty();
}

inline bool isValidGrade(double grade) {
  return grade >= 0.0 && grade <= 10.0;
}
