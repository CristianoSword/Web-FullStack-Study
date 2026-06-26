#include "../include/registry.hpp"
#include "../include/input_validator.hpp"

#include <iostream>

int main(int argc, char** argv) {
  Registry registry;
  registry.add({"Ana", 9.5});
  registry.add({"Bruno", 8.1});

  if (!isValidStudentName("Ana") || !isValidGrade(9.5)) {
    std::cout << "invalid seed data\n";
    return 1;
  }

  if (argc > 2 && std::string(argv[1]) == "find") {
    const auto found = registry.findByName(argv[2]);
    if (found) {
      std::cout << found->name << ": " << found->grade << "\n";
      return 0;
    }

    std::cout << "student not found\n";
    return 1;
  }

  for (const auto& student : registry.all()) {
    std::cout << student.name << ": " << student.grade << "\n";
  }

  return 0;
}
