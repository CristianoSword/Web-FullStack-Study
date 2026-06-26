#pragma once

class Shape {
 public:
  virtual ~Shape() = default;
  virtual double area() const = 0;
};
