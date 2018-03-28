/**
 * @Author: crazymousethief
 * @Date:   6/12/17
 */

#include "gtest/gtest.h"
#include "Analyzer.h"

TEST(analysis_check, main_test) {
  Analyzer alr("input.txt");
  testing::internal::CaptureStdout();
  alr.Analysis();
  std::string output = testing::internal::GetCapturedStdout();
  EXPECT_EQ(output, "Math\n"
      "----\n"
      "Average: 71.71\n"
      "Highest score: 89.00\n"
      "Lowest score: 45.00\n"
      "< 60: 2\n"
      "60~69: 1\n"
      "70~79: 2\n"
      "80~89: 2\n"
      ">= 90: 0\n"
      "\n"
      "English\n"
      "----\n"
      "Average: 73.43\n"
      "Highest score: 88.00\n"
      "Lowest score: 54.00\n"
      "< 60: 1\n"
      "60~69: 2\n"
      "70~79: 2\n"
      "80~89: 2\n"
      ">= 90: 0\n"
      "\n"
      "Computer\n"
      "----\n"
      "Average: 79.14\n"
      "Highest score: 90.00\n"
      "Lowest score: 67.00\n"
      "< 60: 0\n"
      "60~69: 1\n"
      "70~79: 3\n"
      "80~89: 2\n"
      ">= 90: 1\n\n");
}