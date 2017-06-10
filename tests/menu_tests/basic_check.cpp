/**
 * @Author: crazymousethief
 * @Date:   6/10/17
 */

#include "gtest/gtest.h"
#include "../../lib/Menu.h"

TEST(basic_check, test_basic_format) {
    ParentMenu main{new LeafMenu{"wow"}};
    testing::internal::CaptureStdout();
    std::stringstream ss;
    std::cin.rdbuf(ss.rdbuf());
    ss << "0" << std::endl;
    main.Run();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_EQ(output, "---------\n"
            "|1. wow |\n"
            "|0. Quit|\n"
            "---------\n\n"
            "Please select a choice: ");
}
