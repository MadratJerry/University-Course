/**
 * @Author: crazymousethief
 * @Date:   6/10/17
 */

#include <fstream>
#include "gtest/gtest.h"
#include "Analyzer.h"

using namespace std;

TEST(sort_check, test_sort_by_name) {
  ofstream fout("input.txt", ios::out);
  fout << "id name Math English Computer\n"
      "1 WangFang 78 77 90\n"
      "2 ZhangQiang 89 67 88\n"
      "3 LiHao 56 66 78\n"
      "4 HunagPengBin 89 86 85\n"
      "5 LiHao 67 88 76\n"
      "6 ChengLiFeng 45 54 67\n"
      "7 ShangXiao 78 76 70\n";
  fout.close();
  Analyzer alr("input.txt");
  alr.SortByCourseName("Math");
  ifstream fin("sort_by_course_name.txt", std::ios::in);
  string str((std::istreambuf_iterator<char>(fin)),
             std::istreambuf_iterator<char>());
  fin.close();
  EXPECT_EQ(str, "id name Math English Computer\n"
      "2 ZhangQiang 89 67 88\n"
      "4 HunagPengBin 89 86 85\n"
      "1 WangFang 78 77 90\n"
      "7 ShangXiao 78 76 70\n"
      "5 LiHao 67 88 76\n"
      "3 LiHao 56 66 78\n"
      "6 ChengLiFeng 45 54 67\n");
}
