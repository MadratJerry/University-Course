/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Analyzer.h"
#include <fstream>
#include <sstream>
#include <iostream>

using namespace std;

Analyzer::Analyzer(const string &fileName) : fileName{fileName} { loadData(); }

void Analyzer::loadData() {
    ifstream fin(fileName, std::ios::in);
    string str;
    getline(fin, str);
    istringstream iss(str);
    string courseName;
    iss >> courseName >> courseName;
    while (iss >> courseName)
        v.push_back(courseName);
    while (true) {
        unsigned int id;
        string name;
        float score;
        if (!(fin >> id >> name))
            goto END_READ;
        Student *newStu = new Student(id, name, v);
        for (auto name: v) {
            if (!(fin >> score))
                goto END_READ;
            newStu->setScore(name, score);
        }
        list.push_back(newStu);
    }
    END_READ:

    fin.close();
}

Analyzer::~Analyzer() {
    for (auto i : list)
        delete i;
}

void Analyzer::print() {
    for (auto i : list) {
        cout << i->getId() << " " << i->getName();
        for (auto j : v)
            cout << " " << i->getScore(j);
    }
}
