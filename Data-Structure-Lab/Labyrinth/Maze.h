/**
 * @Author: crazymousethief
 * @Date:   6/16/17
 */

#ifndef DATASTRUCTURELAB_MAZE_H
#define DATASTRUCTURELAB_MAZE_H

#include <utility>

class Maze {
 public:
  typedef long size_t;
  class Node;

  explicit Maze(const size_t &width, const size_t &height);

  void Load();

 private:
  size_t width_;
  size_t height_;
};

class Maze::Node {
 public:
  typedef long loc_t;

  explicit Node(const loc_t &x, const loc_t &y);

 private:
  std::pair<loc_t, loc_t> pos;
  bool hash[4] = {0};
  enum { TOP, RIGHT, BOTTOM, LEFT } direction;
};

#endif //DATASTRUCTURELAB_MAZE_H
