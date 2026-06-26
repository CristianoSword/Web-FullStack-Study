#pragma once

template <typename T>
class UniqueLike {
 public:
  explicit UniqueLike(T* value) : value_(value) {}
  ~UniqueLike() { delete value_; }
  T* get() const { return value_; }

 private:
  T* value_;
};
