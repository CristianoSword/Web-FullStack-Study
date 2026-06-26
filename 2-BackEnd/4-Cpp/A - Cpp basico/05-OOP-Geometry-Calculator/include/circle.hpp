#pragma once

#include "shape.hpp"

class Circle : public Shape {
 public:
  explicit Circle(double radius);
  double area() const override;

 private:
  double radius_;
};
