cmake_minimum_required(VERSION 3.8)
project(PerformanceAnalysis)

set(CMAKE_CXX_STANDARD 14)

include_directories(../lib)
set(SOURCE_FILES main.cc Analyzer.h Student.h)
add_executable(PerformanceAnalysis ${SOURCE_FILES})
add_library(Analyzer Analyzer.cc)
add_library(Student Student.cc)
target_link_libraries(PerformanceAnalysis Menu Analyzer Student)
