/**
 * @Author: crazymousethief
 * @Date:   6/16/17
 */

#include "Maze.h"
#include <iostream>

Maze::Maze(const Maze::size_t &width, const Maze::size_t &height) : width_{width}, height_{height} {}

void Maze::Load() {
  for (auto i = 0, str = ""; i < height_; i++) {
    std::cin >> str;
  }
}

Maze::Node::Node(const Maze::Node::loc_t &x, const Maze::Node::loc_t &y) : pos{x, y} {}
