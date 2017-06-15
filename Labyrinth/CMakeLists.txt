cmake_minimum_required(VERSION 3.8)
project(Labyrinth)

set(CMAKE_CXX_STANDARD 14)

set(SOURCE_FILES main.cc)
add_executable(Labyrinth ${SOURCE_FILES})
add_library(Maze Maze.cc)
