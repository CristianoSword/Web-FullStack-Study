#include "../include/rectangle.hpp"

Rectangle::Rectangle(double width, double height) : width_(width), height_(height) {}

double Rectangle::area() const {
  return width_ * height_;
}
