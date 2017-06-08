cmake_minimum_required(VERSION 3.8)
project(stdlite)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_FILES list.cpp list.h container.cpp container.h vector.cpp vector.h)
add_library(stdlite ${SOURCE_FILES})
