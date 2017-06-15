/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Analyzer.h"
#include <fstream>
#include <sstream>
#include <iomanip>
#include <iostream>
#include <array>

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

void Analyzer::SortBy(const std::string &name) {
  StoreData("sort_by_" + (name == "" ? "average" : name) + ".txt", Sort(name), name);
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

void Analyzer::Analysis() {
  array<float, 4> limit{60, 70, 80, 90};
  for (auto name : course_names_) {
    cout << name << endl;
    cout << "----" << endl;
    cout << "Average: " << fixed << setprecision(2) << Average(name) << endl;
    vector<Student *> v_sorted = Sort(name);
    cout << "Highest score: " << (*v_sorted.begin())->score(name) << endl;
    cout << "Lowest score: " << (*(v_sorted.end() - 1))->score(name) << endl;
    cout.unsetf(ios::fixed);
    array<unsigned int, limit.size() + 1> result{0};
    for (auto item : v_sorted) {
      auto score = item->score(name);
      if (score < limit[0])
        result[0]++;
      for (int i = 0; i < limit.size() - 1; i++)
        if (score >= limit[i] && score < limit[i + 1])
          result[i + 1]++;
      if (score >= limit[limit.size() - 1])
        result[limit.size()]++;
    }
    cout << "< " << limit[0] << ": " << result[0] << endl;
    for (int i = 0; i < limit.size() - 1; i++)
      cout << limit[i] << "~" << limit[i + 1] - 1 << ": " << result[i + 1] << endl;
    cout << ">= " << limit[limit.size() - 1] << ": " << result[limit.size()] << endl;
    cout << endl;
  }
}

const float Analyzer::Average(const std::string &name) const {
  float average = 0;
  for (auto i : list_)
    average += i->score(name);
  return average / list_.size();
}

const std::vector<Student *> Analyzer::Sort(const std::string &name) {
  vector<Student *> list_copy(list_.size());
  partial_sort_copy(list_.begin(),
                    list_.end(),
                    list_copy.begin(),
                    list_copy.end(),
                    [&](Student *x, Student *y) {
                      if (x->score(name) == y->score(name)) return x->id() < y->id();
                      else return x->score(name) > y->score(name);
                    });
  return list_copy;
}

void Analyzer::Search() {
  cout << "Input the name: ";
  string name;
  cin >> name;
  long at = Search(name);
  if (at == -1)
    cout << "No such a name." << endl;
  else {
    long i = at, j = at + 1;
    while (true) {
      if (i >= 0 && list_.at(i)->name() == name)
        list_.at(i--)->PrintWithScore(course_names_);
      else if (j < list_.size() && list_.at(j)->name() == name)
        list_.at(j--)->PrintWithScore(course_names_);
      else break;
    }
  }
}

long Analyzer::Search(const std::string &name) {
  sort(list_.begin(), list_.end(), [&](Student *x, Student *y) {
    return x->name() < y->name();
  });
  unsigned long l = 0, r = list_.size() - 1;
  while (l < r) {
    unsigned long mid = l + (r - l) / 2;
    auto item_name = list_.at(mid)->name();
    if (item_name < name) r = mid - 1;
    else if (item_name > name) l = mid + 1;
    else return mid;
  }
  return -1;
}
