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
#include <algorithm>

template<typename NameType, typename DistType>
class Graph {
 public:
  typedef unsigned long size_type;
  class Edge {
   private:
    DistType weight_;
    NameType dist_;
    NameType src_;
   public:
    Edge(const NameType &src, const NameType &dist, const DistType &weight) : src_{src},
                                                                              dist_{dist},
                                                                              weight_{weight} {};

    bool operator<(const Edge &that) const {
      return dist_ < that.dist_;
    };

    const NameType &dist() const { return dist_; };

    const DistType &weight() const { return weight_; };

    const NameType &src() const { return src_; };
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
    edge_list_[src].insert(Edge(src, dist, weight));
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

  void AdjacencyMatrix() {
    auto size = node_list_.size();
    DistType matrix[size][size];
    for (auto i = 0; i < size; i++)
      for (auto j = 0; j < size; j++)
        matrix[i][j] = 0;
    for (auto i : edge_list_) {
      static size_type x = 0;
      for (auto j : edge_list_[i.first]) {
        static size_type y = 0;
        matrix[x][y] = j.weight();
      }
      x++;
    }
    for (auto i : matrix) {
      for (auto j = 0; j < node_list_.size(); j++) {
        std::cout << i[j] << " ";
      }
      std::cout << std::endl;
    }
  }

  void Kruskal() {
    std::vector<Edge> v;
    std::vector<Edge> s;
    for (auto i : edge_list_) {
      fa_[i.first] = i.first;
      for (auto j : edge_list_[i.first])
        v.push_back(j);
    }
    std::sort(v.begin(), v.end(), [&](const Edge &x, const Edge &y) { return x.weight() < y.weight(); });
    for (auto e : v) {
      auto src = e.src(), dist = e.dist();
      if (!connected(src, dist)) {
        Union(src, dist);
        s.push_back(e);
      }
    }

    for (auto e : s) {
      std::cout << "<" << e.src() << "," << e.dist() << "> ";
    }
  }

 private:
  std::map<NameType, std::set<Edge>> edge_list_;
  std::map<NameType, std::pair<size_type, size_type>> node_list_;
  std::map<NameType, bool> hash_;
  std::map<NameType, NameType> fa_;

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

  NameType find(NameType p) {
    while (p != fa_[p]) {
      fa_[p] = fa_[fa_[p]];
      p = fa_[p];
    }
    return p;
  }

  void Union(const NameType &p, const NameType &q) {
    auto rp = find(p), rq = find(q);
    if (rp == rq) return;
    fa_[rp] = fa_[rq];
  }

  bool connected(const NameType &p, const NameType &q) {
    return find(p) == find(q);
  }
};

#endif //DATASTRUCTURELAB_GRAPH_H
