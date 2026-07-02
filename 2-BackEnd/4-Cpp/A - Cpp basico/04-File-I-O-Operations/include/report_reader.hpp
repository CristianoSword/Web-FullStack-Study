#pragma once

#include "record.hpp"
#include "report_stats.hpp"

#include <string>
#include <vector>

std::vector<Record> loadRecords(const std::string& filePath);
ReportStats calculateStats(const std::vector<Record>& records);
