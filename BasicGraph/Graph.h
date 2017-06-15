/**
 * @Author: crazymousethief
 * @Date:   6/14/17
 */

#ifndef DATASTRUCTURELAB_GRAPH_H
#define DATASTRUCTURELAB_GRAPH_H

#include <map>
#include <set>
#include <stack>
#include <vector>

template<typename NameType, typename DistType>
class Graph {
 public:
  typedef unsigned long size_type;
  class Edge {
   private:
    DistType weight_;
    NameType dist_;
   public:
    Edge(const NameType &dist, const DistType &weight) : dist_{dist}, weight_{weight} {};

    bool operator<(const Edge &that) const {
      return dist_ < that.dist_;
    };

    const NameType &dist() const { return dist_; };
  };

  class Node {
   private:
    NameType node_name_;
   public:
    Node();
  };

  void Load(size_type n, size_type e) {
    for (auto i = 0; i < n; i++) {
      NameType node_name;
      std::set<Edge> set;
      std::cin >> node_name;
      edge_list_[node_name] = set;
    }

    for (auto i = 0; i < e; i++) {
      NameType x, y;
      DistType weight;
      std::cin >> x >> y >> weight;
      AddEdge(x, y, weight);
    }
  };

  void AddEdge(const NameType &src, const NameType &dist, const DistType &weight) {
    edge_list_[src].insert(Edge(dist, weight));
    node_list_[dist].first++;
    node_list_[src].second++;
  }

  void PrintInOut() const {
    for (auto i : node_list_)
      std::cout << i.first << " " << i.second.first << " " << i.second.second << std::endl;
  }

  void DFS(const NameType &src) {
    std::stack<NameType> stack;
    std::map<NameType, bool> hash;
    stack.push(src);
    while (!stack.empty()) {
      auto top = stack.top();
      if (!hash[top]) {
        std::cout << top << " ";
        hash[top] = true;
      }
      auto flag = false;
      for (auto i : edge_list_[top])
        if (!hash[i.dist()]) {
          stack.push(i.dist());
          flag = true;
          break;
        }
      if (!flag)
        stack.pop();
    }
  }

  void BFS(const NameType &src) {
    std::vector<NameType> vec;
    std::map<NameType, bool> hash;
    vec.push_back(src);
    size_type index = 0;
    while (index <= node_list_.size()) {
      auto item = vec.at(index++);
      if (!hash[item]) {
        std::cout << item << " ";
        hash[item] = true;
      }
      for (auto i : edge_list_[item])
        if (!hash[i.dist()])
          vec.push_back(i.dist());
    }
  }

 private:
  std::map<NameType, std::set<Edge>> edge_list_;
  std::map<NameType, std::pair<size_type, size_type>> node_list_;
};

#endif //DATASTRUCTURELAB_GRAPH_H
