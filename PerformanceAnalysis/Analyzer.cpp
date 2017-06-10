/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Analyzer.h"
#include <fstream>
#include <sstream>
#include <iostream>

using namespace std;

Analyzer::Analyzer(const string &file_name) : file_name_{file_name} { LoadData(); }

void Analyzer::LoadData() {
    ifstream fin(file_name_, std::ios::in);
    string str;
    getline(fin, str);
    istringstream iss(str);
    string courseName;
    iss >> courseName >> courseName;
    while (iss >> courseName)
        course_names_.push_back(courseName);
    while (true) {
        unsigned int id;
        string name;
        float score;
        if (!(fin >> id >> name))
            goto END_READ;
        Student *newStu = new Student(id, name, course_names_);
        for (auto name: course_names_) {
            if (!(fin >> score))
                goto END_READ;
            newStu->set_score(name, score);
        }
        list_.push_back(newStu);
    }
    END_READ:

    fin.close();
}

Analyzer::~Analyzer() {
    for (auto i : list_)
        delete i;
}

void Analyzer::Print() {
    for (auto i : list_) {
        cout << i->id() << " " << i->name();
        for (auto j : course_names_)
            cout << " " << i->score(j);
        cout << endl;
    }
}

void Analyzer::Add() {
    cout << "Please input the new student information: " << endl;
    unsigned int id;
    string name;
    cin >> id >> name;
    Student *newStu = new Student(id, name, course_names_);
    for (auto i : course_names_) {
        float score;
        cin >> score;
        newStu->set_score(i, score);
    }
    list_.push_back(newStu);
    StoreData();
}

void Analyzer::StoreData() {
    ofstream fout(file_name_, ios::out);
    fout << "id" << " " << "name";
    for (auto i : course_names_)
        fout << " " << i;
    fout << endl;
    for (auto i : list_){
        fout << i->id() <<" " << i->name();
        for (auto j : course_names_)
            fout << " " << i->score(j);
        fout << endl;
    }
    fout.close();
}
