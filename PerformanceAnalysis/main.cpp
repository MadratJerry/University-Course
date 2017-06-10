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
                       new ParentMenu{"Analysis", {
                           new LeafMenu{"Sort by each course score", [&]() {
                             for (auto i : alr.course_names())
                               alr.SortBy(i);
                           }},
                           new LeafMenu{"Sort by average score", [&]() {
                             alr.SortBy("");
                           }}
                       }},
                       new LeafMenu{"Full View", [&]() { alr.Print(); }}
  };
  main_menu.Run();
  return 0;
}
