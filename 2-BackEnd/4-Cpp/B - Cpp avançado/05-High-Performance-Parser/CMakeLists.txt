cmake_minimum_required(VERSION 3.16)
project(high_performance_parser)

set(CMAKE_CXX_STANDARD 17)

add_executable(high_performance_parser src/main.cpp src/flat_parser.cpp)
