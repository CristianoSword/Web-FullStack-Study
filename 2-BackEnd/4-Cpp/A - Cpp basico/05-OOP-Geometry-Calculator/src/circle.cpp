#include "../include/circle.hpp"

Circle::Circle(double radius) : radius_(radius) {}

double Circle::area() const {
  return 3.14159 * radius_ * radius_;
}
