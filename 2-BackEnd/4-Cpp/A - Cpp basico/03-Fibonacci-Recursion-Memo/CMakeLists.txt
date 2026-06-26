cmake_minimum_required(VERSION 3.16)
project(fibonacci_recursion_memo)

set(CMAKE_CXX_STANDARD 17)

add_executable(fibonacci_recursion_memo src/main.cpp src/fibonacci_service.cpp)
