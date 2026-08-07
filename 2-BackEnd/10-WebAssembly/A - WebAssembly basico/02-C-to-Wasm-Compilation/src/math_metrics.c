#include "math_metrics.h"

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

EMSCRIPTEN_KEEPALIVE
int sum_range(const int *values, int length) {
  int total = 0;

  for (int index = 0; index < length; index++) {
    total += values[index];
  }

  return total;
}

EMSCRIPTEN_KEEPALIVE
double weighted_average(const int *values, const int *weights, int length) {
  if (length <= 0) {
    return 0.0;
  }

  int weighted_total = 0;
  int weight_sum = 0;

  for (int index = 0; index < length; index++) {
    weighted_total += values[index] * weights[index];
    weight_sum += weights[index];
  }

  if (weight_sum == 0) {
    return 0.0;
  }

  return (double) weighted_total / (double) weight_sum;
}

EMSCRIPTEN_KEEPALIVE
int clamp_score(int value, int min_value, int max_value) {
  if (value < min_value) {
    return min_value;
  }

  if (value > max_value) {
    return max_value;
  }

  return value;
}
