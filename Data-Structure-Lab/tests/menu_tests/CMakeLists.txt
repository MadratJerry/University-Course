cmake_minimum_required(VERSION 3.8)

include_directories(${gtest_SOURCE_DIR}/include ${gtest_SOURCE_DIR})
include_directories(../../lib)

add_executable(menu_tests basic_check.cc)

target_link_libraries(menu_tests gtest gtest_main)
target_link_libraries(menu_tests gtest Menu)
