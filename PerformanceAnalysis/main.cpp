/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include <iostream>
#include "Analyzer.h"
#include "Menu.h"

using namespace std;

int main() {
    ParentMenu mainMenu{new LeafMenu("Add"),
                 new LeafMenu("Search"),
                 new LeafMenu("Analysis"),
                 new LeafMenu("Full View")
    };
    mainMenu.run();
    return 0;
}
