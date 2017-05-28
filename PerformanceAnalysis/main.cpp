/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include <iostream>
#include "Menu.h"

using namespace std;

int test() {

}

int main() {
    ParentMenu b("1", []() { return 1; },
                 {new ParentMenu("1-1", test,
                                 {new ParentMenu("1-1-1", test,
                                                 {new LeafMenu("1-1-1-1", test)})}),
                  new ParentMenu("1-2", test,
                                 {new LeafMenu("1-2-1", test)})
                 });
    return 0;
}
