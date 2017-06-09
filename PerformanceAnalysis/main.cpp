/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include <iostream>
#include "Menu.h"
#include "Analyzer.h"

using namespace std;

int main() {
    Analyzer alr("input.txt");
    ParentMenu mainMenu{new LeafMenu{"Add", [&]() { alr.add(); }},
                        new LeafMenu{"Search"},
                        new LeafMenu{"Analysis"},
                        new LeafMenu{"Full View", [&]() { alr.print(); }}
    };
    mainMenu.run();
    return 0;
}
