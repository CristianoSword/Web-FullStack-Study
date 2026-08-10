#include "arithmetic_helper.h"

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

EMSCRIPTEN_KEEPALIVE
double vector_dot_product(const double *left, const double *right, int length) {
  double total = 0.0;

  for (int index = 0; index < length; index++) {
    total += left[index] * right[index];
  }

  return total;
}

EMSCRIPTEN_KEEPALIVE
double matrix_trace(const double *values, int size) {
  double trace = 0.0;

  for (int row = 0; row < size; row++) {
    trace += values[(row * size) + row];
  }

  return trace;
}

EMSCRIPTEN_KEEPALIVE
double normalize_score(double value, double min_value, double max_value) {
  if (max_value == min_value) {
    return 0.0;
  }

  return ((value - min_value) / (max_value - min_value)) * 100.0;
}
