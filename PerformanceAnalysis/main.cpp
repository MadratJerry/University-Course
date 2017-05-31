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
    ParentMenu a{new LeafMenu("Add"),
                 new LeafMenu("Search"),
                 new LeafMenu("Analysis"),
                 new LeafMenu("Full View")
    };
    a.run();
    return 0;
}
