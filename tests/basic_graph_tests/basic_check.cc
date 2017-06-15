/**
 * @Author: crazymousethief
 * @Date:   6/14/17
 */

#include "gtest/gtest.h"
#include "Graph.h"

using  namespace std;

string input1 = "9 15\n"
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

string input2 ="5 3\n"
    "a b c d f\n"
    "a b 1\n"
    "b c 2\n"
    "e f 1";

TEST(basic_graph_check, test_in_out) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input1 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.PrintInOut();
  std::string output = testing::internal::GetCapturedStdout();
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

TEST(basic_graph_check, test_DFS_1) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input1 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.DFS("a");
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "a b c d e f h i g ");
}

TEST(basic_graph_check, test_DFS_2) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input2 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.DFS("a");
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "a b c e f ");
}

TEST(basic_graph_check, test_BFS_1) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input1 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.BFS("a");
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "a b f g c h i d e ");
}

TEST(basic_graph_check, test_BFS_2) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input2 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.BFS("a");
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "a b c e f ");
}

TEST(basic_graph_check, test_Connected_1) {
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input1 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  EXPECT_TRUE(graph.IsConnected());
}

TEST(basic_graph_check, test_Connected_2) {
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input2 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  EXPECT_FALSE(graph.IsConnected());
}

TEST(basic_graph_check, test_Find) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input1 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.Find("a");
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "Has a\n");
}

TEST(basic_graph_check, test_AdjacencyMatrix) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input2 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.AdjacencyMatrix();
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "1 0 0 0 0 \n"
      "2 0 0 0 0 \n"
      "0 0 0 0 0 \n"
      "0 0 0 0 0 \n"
      "1 0 0 0 0 \n");
}

TEST(basic_graph_check, test_Kruskal) {
  testing::internal::CaptureStdout();
  std::stringstream ss;
  std::cin.rdbuf(ss.rdbuf());
  ss << input1 << std::endl;
  Graph<string, int>::size_type n, e;
  cin >> n >> e;
  Graph<string, int> graph;
  graph.Load(n, e);
  graph.Kruskal();
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "<d,e> <d,i> <a,b> <g,i> <c,d> <e,h> <b,c> <e,f> ");
}
