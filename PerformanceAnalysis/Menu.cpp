/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include "Menu.h"
#include <iostream>

Menu::Menu() {
    parent = nullptr;
}

LeafMenu::LeafMenu(std::string content, const std::function<int()> &method) {
    this->content = content;
    this->method = method;
}

std::string LeafMenu::getContent() {
    return this->content;
}

LeafMenu::~LeafMenu() {
    std::cout << "del" << getContent() << std::endl;
}

ParentMenu::ParentMenu(std::string content, const std::function<int()> &method, std::initializer_list<LeafMenu *> list)
        : LeafMenu(content, method) {
    for (auto item : list)
        v.push_back(item);
}

ParentMenu::~ParentMenu() {
    std::cout << "wow" << getContent() << std::endl;
    for (auto item : v)
        delete item;
}
