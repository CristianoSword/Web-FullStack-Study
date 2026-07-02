#include "../include/report_reader.hpp"
#include "../include/report_validator.hpp"

#include <algorithm>
#include <fstream>
#include <sstream>

std::vector<Record> loadRecords(const std::string& filePath) {
  std::ifstream input(filePath);
  std::vector<Record> records;
  std::string line;

  if (!input.is_open()) {
    return records;
  }

  while (std::getline(input, line)) {
    if (line.empty() || line == "category,amount") {
      continue;
    }

    std::stringstream stream(line);
    std::string category;
    std::string amountToken;
    if (!std::getline(stream, category, ',') || !std::getline(stream, amountToken)) {
      continue;
    }

    Record record{category, std::stoi(amountToken)};
    records.push_back(record);
  }

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
