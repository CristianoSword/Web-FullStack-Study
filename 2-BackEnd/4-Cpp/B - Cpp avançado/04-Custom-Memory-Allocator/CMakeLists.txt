cmake_minimum_required(VERSION 3.16)
project(custom_memory_allocator)

set(CMAKE_CXX_STANDARD 17)

add_executable(custom_memory_allocator src/main.cpp src/linear_allocator.cpp)
