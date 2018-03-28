cmake_minimum_required(VERSION 3.8)

include_directories(${gtest_SOURCE_DIR}/include ${gtest_SOURCE_DIR})
include_directories(../../BasicGraph)

add_executable(basic_graph_tests basic_check.cc)

target_link_libraries(basic_graph_tests gtest gtest_main)