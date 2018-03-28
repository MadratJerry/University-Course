/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#include "Menu.h"
#include <iostream>
#include <iomanip>

using namespace std;

Menu::Menu(const string &content) {
  set_content(content);
}

const string &Menu::content() const {
  return this->content_;
}

void Menu::set_content(const string &content) {
  this->content_ = content;
}

Menu::~Menu() {}

LeafMenu::LeafMenu(const string &content, const function<void()> &fn) : Menu(content) {
  this->fn_ = fn;
}

LeafMenu::~LeafMenu() {}

void LeafMenu::Call() {
  this->fn_();
}

LeafMenu::LeafMenu(const string &content) : LeafMenu::LeafMenu(content, []() { return 1; }) {}

ParentMenu::ParentMenu(const string &content, const initializer_list<Menu *> &list)
    : Menu(content) {
  for (auto item : list) {
    if (item->content().length() > max_content_size_)
      max_content_size_ = item->content().length();
    menu_list_.push_back(item);
  }
}

ParentMenu::~ParentMenu() {
  for (auto item : menu_list_)
    delete item;
}

void ParentMenu::Run() {
  int c;
  do {
    ParentMenu::DisplayMenu();
    cout << endl << "Please select a choice: ";
    cin >> c;
    if (c > 0 && c <= menu_list_.size()) {
      if (typeid(*menu_list_[c - 1]) == typeid(*this))
        ((ParentMenu *) menu_list_[c - 1])->Run();
      else ((LeafMenu *) menu_list_[c - 1])->Call();
    } else if (c != 0) {
      cout << "Wrong choice, please choose again!" << endl;
    }
  } while (c != 0);
}

void ParentMenu::DisplayMenu() {
  for (int i = 0; i < max_content_size_ + 5; i++)
    cout << "-";
  cout << endl;
  for (int i = 0; i < menu_list_.size(); i++)
    cout << "|" << i + 1 << ". " << menu_list_[i]->content()
         << setw(max_content_size_ - menu_list_[i]->content().length() + 1) << '|'
         << endl;
  cout << "|" << 0 << ". " << "Quit" << setw(max_content_size_ - 3) << "|" << endl;
  for (int i = 0; i < max_content_size_ + 5; i++)
    cout << "-";
  cout << endl;
}

ParentMenu::ParentMenu(const initializer_list<Menu *> &list) : ParentMenu::ParentMenu("", list) {}