/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include "Menu.h"
#include <iostream>
#include <iomanip>

using namespace std;

Menu::Menu(const string &content) {
    setContent(content);
}

const string &Menu::getContent() const {
    return this->content;
}

void Menu::setContent(const string &content) {
    this->content = content;
}

Menu::~Menu() {}

LeafMenu::LeafMenu(const string &content, const function<void()> &fn) : Menu(content) {
    this->fn = fn;
}

LeafMenu::~LeafMenu() {}

void LeafMenu::call() {
    this->fn();
}

LeafMenu::LeafMenu(const string &content) : LeafMenu::LeafMenu(content, []() { return 1; }) {}

ParentMenu::ParentMenu(const string &content, const initializer_list<Menu *> &list)
        : Menu(content) {
    for (auto item : list) {
        if (item->getContent().length() > maxMenuSize)
            maxMenuSize = item->getContent().length();
        v.push_back(item);
    }
}

ParentMenu::~ParentMenu() {
    for (auto item : v)
        delete item;
}

void ParentMenu::run() {
    int c;
    do {
        ParentMenu::displayMenu();
        cout << endl << "Please select a choice: ";
        cin >> c;
        if (c > 0 && c <= v.size()) {
            if (typeid(*v[c - 1]) == typeid(*this))
                ((ParentMenu *) v[c - 1])->run();
            else ((LeafMenu *) v[c - 1])->call();
        } else if (c != 0) {
            cout << "Wrong choice, please choose again!" << endl;
        }
    } while (c != 0);
}

void ParentMenu::displayMenu() {
    for (int i = 0; i < maxMenuSize + 5; i++)
        cout << "-";
    cout << endl;
    for (int i = 0; i < v.size(); i++)
        cout << "|" << i + 1 << ". " << v[i]->getContent() << setw(maxMenuSize - v[i]->getContent().length() + 1) << '|'
             << endl;
    cout << "|" << 0 << ". " << "Quit" << setw(maxMenuSize - 3) << "|" << endl;
    for (int i = 0; i < maxMenuSize + 5; i++)
        cout << "-";
    cout << endl;
}

ParentMenu::ParentMenu(const initializer_list<Menu *> &list) : ParentMenu::ParentMenu("", list) {}