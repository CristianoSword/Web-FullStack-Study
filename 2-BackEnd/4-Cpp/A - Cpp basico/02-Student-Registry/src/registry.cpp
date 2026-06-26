#include "../include/registry.hpp"

void Registry::add(const Student& student) {
  students_.push_back(student);
}

StudentSearchResult Registry::findByName(const std::string& name) const {
  for (const auto& student : students_) {
    if (student.name == name) {
      return student;
    }
  }

  return std::nullopt;
}

const std::vector<Student>& Registry::all() const {
  return students_;
}
