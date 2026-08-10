#ifndef ARITHMETIC_HELPER_H
#define ARITHMETIC_HELPER_H

double vector_dot_product(const double *left, const double *right, int length);
double matrix_trace(const double *values, int size);
double normalize_score(double value, double min_value, double max_value);

#endif
