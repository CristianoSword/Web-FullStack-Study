#include "../include/report_reader.hpp"

#include <iostream>

int main() {
  const auto records = loadRecords("data/records.csv");
  const auto stats = calculateStats(records);
  std::cout << "records: " << stats.totalRecords << "\n";
  std::cout << "amount: " << stats.totalAmount << "\n";
  return 0;
}
