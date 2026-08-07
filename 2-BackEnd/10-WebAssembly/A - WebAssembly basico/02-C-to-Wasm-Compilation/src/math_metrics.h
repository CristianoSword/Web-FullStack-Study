#ifndef MATH_METRICS_H
#define MATH_METRICS_H

int sum_range(const int *values, int length);
double weighted_average(const int *values, const int *weights, int length);
int clamp_score(int value, int min_value, int max_value);

#endif
