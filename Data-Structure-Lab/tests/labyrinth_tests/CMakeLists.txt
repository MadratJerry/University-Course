cmake_minimum_required(VERSION 3.8)

include_directories(${gtest_SOURCE_DIR}/include ${gtest_SOURCE_DIR})
include_directories(../../Labyrinth)

add_executable(labyrinth_tests basic_check.cc)

target_link_libraries(labyrinth_tests gtest gtest_main)