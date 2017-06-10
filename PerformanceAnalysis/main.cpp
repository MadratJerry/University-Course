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
  ParentMenu main_menu{new LeafMenu{"Add", [&]() { alr.Add(); }},
                       new LeafMenu{"Search"},
                       new LeafMenu{"Analysis"},
                       new LeafMenu{"Full View", [&]() { alr.Print(); }}
  };
  main_menu.Run();
  return 0;
}
