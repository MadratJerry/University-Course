/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include "Menu.h"
#include <iostream>

Menu::Menu(std::string content) {
    setContent(content);
}

std::string Menu::getContent() {
    return this->content;
}

void Menu::setContent(std::string content) {
    this->content = content;
}

Menu::~Menu() {}

LeafMenu::LeafMenu(std::string content, const std::function<int()> &fn) : Menu(content) {
    this->fn = fn;
}

LeafMenu::~LeafMenu() {}

void LeafMenu::call() {
    this->fn();
}

LeafMenu::LeafMenu(std::string content) : LeafMenu::LeafMenu(content, []() {return 1;}) {}

ParentMenu::ParentMenu(std::string content, std::initializer_list<Menu *> list)
        : Menu(content) {
    for (auto item : list)
        v.push_back(item);
}

ParentMenu::~ParentMenu() {
    for (auto item : v)
        delete item;
}

void ParentMenu::run() {
    int c;
    do {
        ParentMenu::displayMenu();
        std::cout << "Please select a choice: ";
        std::cin >> c;
        if (c > 0 && c <= v.size()) {
            if (typeid(*v[c - 1]) == typeid(*this))
                ((ParentMenu *) v[c - 1])->run();
            else ((LeafMenu *) v[c - 1])->call();
        }
    } while (c != 0);
}

unsigned long ParentMenu::getMenuSize() {
    return v.size();
}

void ParentMenu::displayMenu() {
    for (int i = 0; i < v.size(); i++)
        std::cout << i + 1 << ". " << v[i]->getContent() << std::endl;
    std::cout << 0 << ". " << "Quit" << std::endl;
}

ParentMenu::ParentMenu(std::initializer_list<Menu *> list) : ParentMenu::ParentMenu("", list) {}
