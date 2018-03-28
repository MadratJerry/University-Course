cmake_minimum_required(VERSION 3.8)
project(stdlite)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_FILES list.cc list.h container.cc container.h vector.cc vector.h)
add_library(stdlite ${SOURCE_FILES})
