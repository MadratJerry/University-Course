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

  void Print() {
    for (auto i : edge_list_) {
      std::cout << i.first;
      for (auto j : edge_list_[i.first])
        std::cout << " " << j.dist();
      std::cout << std::endl;
    }
  }

  void PrintInOut() const {
    for (auto i : node_list_)
      std::cout << i.first << " " << i.second.first << " " << i.second.second << std::endl;
  }

  void DFS(const NameType &src) {
    hash_.clear();
    size_type count = dfs(src, true);
    while (count != node_list_.size()) {
      for (auto i : node_list_)
        if (!hash_[i.first])
          count += dfs(i.first, true);
    }
  }

  void BFS(const NameType &src) {
    hash_.clear();
    size_type count = bfs(src);
    while (count != node_list_.size()) {
      for (auto i : node_list_)
        if (!hash_[i.first])
          count += bfs(i.first);
    }
  }

  void Find(const NameType &x) const {
    std::cout << (edge_list_.find(x) == edge_list_.end() ? "No " : "Has ") << x << std::endl;
  }

  bool IsConnected() {
    return dfs((*node_list_.begin()).first, false) == node_list_.size();
  }

 private:
  std::map<NameType, std::set<Edge>> edge_list_;
  std::map<NameType, std::pair<size_type, size_type>> node_list_;
  std::map<NameType, bool> hash_;

  size_type dfs(const NameType &src, bool is_output) {
    size_type count = 0;
    if (is_output)
      std::cout << src << " ";
    hash_[src] = true;
    for (auto i : edge_list_[src])
      if (!hash_[i.dist()])
        count += dfs(i.dist(), is_output);
    return count + 1;
  }

  size_type bfs(const NameType &src) {
    std::vector<NameType> vec;
    vec.push_back(src);
    hash_[src] = true;
    size_type index = 0;
    while (index < vec.size()) {
      auto item = vec.at(index++);
      std::cout << item << " ";
      for (auto i : edge_list_[item])
        if (!hash_[i.dist()]) {
          vec.push_back(i.dist());
          hash_[i.dist()] = true;
        }
    }
    return index;
  }
};

#endif //DATASTRUCTURELAB_GRAPH_H
