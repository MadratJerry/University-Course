cmake_minimum_required(VERSION 3.8)
project(PerformanceAnalysis)

set(CMAKE_CXX_STANDARD 14)

include_directories(../lib)
set(SOURCE_FILES main.cpp Analyzer.cpp Analyzer.h Student.cpp Student.h)
add_executable(PerformanceAnalysis ${SOURCE_FILES})
target_link_libraries(PerformanceAnalysis Menu)
