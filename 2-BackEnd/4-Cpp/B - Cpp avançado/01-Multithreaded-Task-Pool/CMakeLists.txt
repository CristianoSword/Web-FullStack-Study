cmake_minimum_required(VERSION 3.16)
project(multithreaded_task_pool)

set(CMAKE_CXX_STANDARD 17)

find_package(Threads REQUIRED)

add_executable(multithreaded_task_pool src/main.cpp src/task_pool.cpp)
target_link_libraries(multithreaded_task_pool PRIVATE Threads::Threads)
