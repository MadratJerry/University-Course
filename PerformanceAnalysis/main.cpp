/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include <iostream>
#include "Menu.h"
#include "Analyzer.h"

using namespace std;

int main() {
    ParentMenu mainMenu{new LeafMenu("Add"),
                        new LeafMenu("Search"),
                        new LeafMenu("Analysis"),
                        new LeafMenu("Full View")
    };
//    mainMenu.run();
    Analyzer a("input.txt");
    a.loadData();
    return 0;
}
