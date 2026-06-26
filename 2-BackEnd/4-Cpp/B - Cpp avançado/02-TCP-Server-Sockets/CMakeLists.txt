cmake_minimum_required(VERSION 3.16)
project(tcp_server_sockets)

set(CMAKE_CXX_STANDARD 17)

add_executable(tcp_server_sockets src/main.cpp src/server_state.cpp)
