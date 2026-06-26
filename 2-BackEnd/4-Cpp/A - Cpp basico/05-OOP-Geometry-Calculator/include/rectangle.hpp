#pragma once

#include "shape.hpp"

class Rectangle : public Shape {
 public:
  Rectangle(double width, double height);
  double area() const override;

 private:
  double width_;
  double height_;
};
