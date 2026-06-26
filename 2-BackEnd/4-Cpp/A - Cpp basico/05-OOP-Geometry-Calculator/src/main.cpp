#include "../include/circle.hpp"
#include "../include/rectangle.hpp"

#include <iostream>

int main() {
  Rectangle rectangle(4.0, 6.0);
  Circle circle(3.0);
  std::cout << "rectangle: " << rectangle.area() << "\n";
  std::cout << "circle: " << circle.area() << "\n";
  return 0;
}
