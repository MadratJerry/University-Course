/**
 * @Author: crazymousethief
 * @Date:   6/14/17
 */

#include "gtest/gtest.h"
#include "Graph.h"

using  namespace std;

string input = "9 15\n"
    "a b c d e f g h i\n"
    "a b 2\n"
    "a g 15\n"
    "a f 9\n"
    "b c 4\n"
    "b g 6\n"
    "c d 2\n"
    "c i 15\n"
    "d i 1\n"
    "d e 1\n"
    "e h 3\n"
    "e f 6\n"
    "f h 11\n"
    "g h 15\n"
    "g i 2\n"
    "h i 4";

TEST(basic_graph_check, test_in_out) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.PrintInOut();
  std::string output = testing::internal::GetCapturedStdout();
  cout << output << endl;
  EXPECT_EQ(output, "a 0 3\n"
      "b 1 2\n"
      "c 1 2\n"
      "d 1 2\n"
      "e 1 2\n"
      "f 2 1\n"
      "g 2 2\n"
      "h 3 1\n"
      "i 4 0\n");
}