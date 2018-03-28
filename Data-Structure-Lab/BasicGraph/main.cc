/**
 * @Author: crazymousethief
 * @Date:   6/14/17
 */

#include <iostream>
#include "Graph.h"

using namespace std;


int main() {
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  return 0;
}