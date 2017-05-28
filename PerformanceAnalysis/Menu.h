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
    Menu *parent;
public:
    Menu();
};

class LeafMenu : public Menu {
private:
    std::string content;
    std::function<int()> method;
public:
    LeafMenu(std::string content, const std::function<int()> &method);

    virtual ~LeafMenu();

    std::string getContent();
};

class ParentMenu : public LeafMenu {
private:
    std::vector<LeafMenu *> v;
public:
    ParentMenu(std::string content, const std::function<int()> &method, std::initializer_list<LeafMenu *> list);

    virtual ~ParentMenu();
};

#endif //DATASTRUCTURELAB_MENU_H
