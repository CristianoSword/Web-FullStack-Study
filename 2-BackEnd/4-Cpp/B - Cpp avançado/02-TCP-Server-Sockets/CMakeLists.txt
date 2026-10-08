cmake_minimum_required(VERSION 3.16)
project(tcp_server_sockets)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(
  tcp_server_sockets
  src/main.cpp
  src/server_state.cpp
  src/server_command.cpp
  src/chat_server.cpp
  src/socket_guard.cpp
)

target_include_directories(tcp_server_sockets PRIVATE include)
target_link_libraries(tcp_server_sockets PRIVATE ws2_32)
