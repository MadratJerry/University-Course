cmake_minimum_required(VERSION 3.8)

include_directories(${gtest_SOURCE_DIR}/include ${gtest_SOURCE_DIR})
include_directories(../../PerformanceAnalysis)

add_executable(performance_analysis_tests sort_check.cc analysis_check.cc)

target_link_libraries(performance_analysis_tests gtest gtest_main)
target_link_libraries(performance_analysis_tests gtest Analyzer Student)
