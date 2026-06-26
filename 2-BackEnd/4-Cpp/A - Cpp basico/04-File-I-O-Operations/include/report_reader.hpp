#pragma once

#include "record.hpp"
#include "report_stats.hpp"

#include <vector>

std::vector<Record> loadSampleRecords();
ReportStats calculateStats(const std::vector<Record>& records);
