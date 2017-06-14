/**
 * @Author: crazymousethief
 * @Date:   6/14/17
 */

#ifndef DATASTRUCTURELAB_GRAPH_H
#define DATASTRUCTURELAB_GRAPH_H

#include <map>
#include <set>

template<typename NameType, typename DistType>
class Graph {
 private:
  class Edge {
   private:
    DistType weight_;
    NameType dist_;
   public:
    Edge(NameType dist, DistType weight) : dist_{dist}, weight_{weight} {}
    bool operator<(const Edge &that) const {
      return dist_ < that.dist_;
    }
  };
  std::map<NameType, std::set<Edge>> graph_;
 public:
  typedef unsigned long size_type;
  void Load(size_type n, size_type e);
};

#include "Graph.cc"
#endif //DATASTRUCTURELAB_GRAPH_H
