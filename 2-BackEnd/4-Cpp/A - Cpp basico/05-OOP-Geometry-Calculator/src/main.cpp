#include "../include/circle.hpp"
#include "../include/rectangle.hpp"
#include "../include/shape_guard.hpp"

#include <iostream>

int main() {
  if (!isPositive(4.0) || !isPositive(6.0) || !isPositive(3.0)) {
    std::cout << "invalid dimensions\n";
    return 1;
  }

  Rectangle rectangle(4.0, 6.0);
  Circle circle(3.0);
  std::cout << "rectangle: " << rectangle.area() << "\n";
  std::cout << "circle: " << circle.area() << "\n";
  return 0;
}
