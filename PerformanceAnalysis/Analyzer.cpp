/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Analyzer.h"
#include <fstream>
#include <sstream>
#include <iomanip>
#include <iostream>

using namespace std;

Analyzer::Analyzer(const std::string &input_file_name)
    : input_file_name_{input_file_name} { LoadData(); }

void Analyzer::LoadData() {
  ifstream fin(input_file_name_, std::ios::in);
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
  StoreData(input_file_name_, list_, course_names_);
}

void Analyzer::SortBy(const string &name) {
  vector<Student *> list_copy(list_.size());
  partial_sort_copy(list_.begin(),
                    list_.end(),
                    list_copy.begin(),
                    list_copy.end(),
                    [&](Student *x, Student *y) {
                      if (x->score(name) == y->score(name)) return x->id() < y->id();
                      else return x->score(name) > y->score(name);
                    });
  StoreData("sort_by_" + (name == "" ? "average" : name) + ".txt", list_copy, name);
}

void Analyzer::StoreData(const std::string &output_file_name,
                         const std::vector<Student *> &list,
                         const std::vector<std::string> &names) {
  ofstream fout(output_file_name, ios::out);
  fout << "id" << " " << "name";
  for (auto i : names)
    fout << " " << i;
  fout << endl;
  for (auto i : list) {
    fout << i->id() << " " << i->name();
    for (auto j : names)
      fout << " " << fixed << setprecision(2) << i->score(j);
    fout << endl;
  }
  fout.close();
}

const std::vector<std::string> &Analyzer::course_names() const {
  return course_names_;
}

void Analyzer::StoreData(const std::string &output_file_name,
                         const std::vector<Student *> &list,
                         const std::string &name) {
  vector<std::string> v{name};
  StoreData(output_file_name, list, v);
}
