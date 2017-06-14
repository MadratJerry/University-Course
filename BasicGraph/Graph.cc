/**
 * @Author: crazymousethief
 * @Date:   6/14/17
 */

#include "Graph.h"
#include <iostream>

template<typename NameType, typename DistType>
void Graph<NameType, DistType>::Load(size_type n, size_type e) {
  for (auto i = 0; i < n; i++) {
    NameType node_name;
    std::set<Edge> set;
    std::cin >> node_name;
    graph_[node_name] = set;
  }

  for (auto i = 0; i < e; i++) {
    NameType x, y;
    DistType weight;
    std::cin >> x >> y >> weight;
    graph_[x].insert(Edge(y, weight));
  }
}