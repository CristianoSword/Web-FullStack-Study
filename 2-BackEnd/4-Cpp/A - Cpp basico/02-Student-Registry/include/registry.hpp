#pragma once

#include "search_result.hpp"
#include "student.hpp"

#include <vector>

class Registry {
 public:
  void add(const Student& student);
  StudentSearchResult findByName(const std::string& name) const;
  const std::vector<Student>& all() const;

 private:
  std::vector<Student> students_;
};
