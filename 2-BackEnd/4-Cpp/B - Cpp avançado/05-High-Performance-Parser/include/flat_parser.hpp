#pragma once

#include "parse_result.hpp"

#include <string_view>

ParseResult parseFlatObject(std::string_view payload);
