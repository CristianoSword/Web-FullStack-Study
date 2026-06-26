#include "../include/report_reader.hpp"
#include "../include/report_validator.hpp"

#include <algorithm>

std::vector<Record> loadSampleRecords() {
  std::vector<Record> records = {{"hardware", 12}, {"software", 7}};
  records.erase(std::remove_if(records.begin(), records.end(), [](const Record& record) {
                  return !isValidRecord(record);
                }),
                records.end());
  return records;
}

ReportStats calculateStats(const std::vector<Record>& records) {
  ReportStats stats{0, 0};
  for (const auto& record : records) {
    stats.totalRecords += 1;
    stats.totalAmount += record.amount;
  }

  return stats;
}
