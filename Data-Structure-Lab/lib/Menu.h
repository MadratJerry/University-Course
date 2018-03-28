/**
 * @Author: crazymousethief
 * @Date:   5/29/17
 */

#ifndef DATASTRUCTURELAB_MENU_H
#define DATASTRUCTURELAB_MENU_H

#include <string>
#include <vector>
#include <functional>

class Menu {
 private:
  std::string content_;
 public:
  Menu(const std::string &content);

  virtual ~Menu();

  virtual const std::string &content() const;

  void set_content(const std::string &content);
};

class LeafMenu : public Menu {
 private:
  std::function<void()> fn_;
 public:
  LeafMenu(const std::string &content, const std::function<void()> &fn);

  LeafMenu(const std::string &content);

  virtual ~LeafMenu();

  void Call();
};

class ParentMenu : public Menu {
 private:
  std::vector<Menu *> menu_list_;
  unsigned long max_content_size_ = 4;

  void DisplayMenu();

 public:
  ParentMenu(const std::string &content, const std::initializer_list<Menu *> &list);

  ParentMenu(const std::initializer_list<Menu *> &list);

  virtual ~ParentMenu();

  void Run();
};

#endif //DATASTRUCTURELAB_MENU_H
