cmake_minimum_required(VERSION 3.8)
project(PerformanceAnalysis)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_FILES main.cpp Menu.cpp Menu.h Analyzer.cpp Analyzer.h Student.cpp Student.h)
add_executable(PerformanceAnalysis ${SOURCE_FILES})