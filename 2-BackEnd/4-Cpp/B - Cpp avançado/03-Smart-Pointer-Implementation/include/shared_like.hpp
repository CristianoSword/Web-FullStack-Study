#pragma once

#include "ref_counter.hpp"

template <typename T>
class SharedLike {
 public:
  explicit SharedLike(T* value) : value_(value), counter_(new RefCounter{1}) {}
  ~SharedLike() {
    counter_->value -= 1;
    if (counter_->value == 0) {
      delete value_;
      delete counter_;
    }
  }
  T* get() const { return value_; }

 private:
  T* value_;
  RefCounter* counter_;
};
