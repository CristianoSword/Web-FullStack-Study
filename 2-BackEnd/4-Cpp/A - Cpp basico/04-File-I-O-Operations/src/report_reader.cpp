#include "../include/report_reader.hpp"

std::vector<Record> loadSampleRecords() {
  return {{"hardware", 12}, {"software", 7}};
}

ReportStats calculateStats(const std::vector<Record>& records) {
  ReportStats stats{0, 0};
  for (const auto& record : records) {
    stats.totalRecords += 1;
    stats.totalAmount += record.amount;
  }

  return stats;
}
