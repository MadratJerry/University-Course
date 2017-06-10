/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Student.h"

#include <iostream>

const std::string &Student::name() const {
  return name_;
}

void Student::set_name(const std::string &name) {
  Student::name_ = name;
}

unsigned int Student::id() const {
  return id_;
}

void Student::set_id(unsigned int id) {
  Student::id_ = id;
}

Student::Student(unsigned int id, const std::string &name, const std::vector<std::string> &v) {
  set_id(id);
  set_name(name);
  this->score_ = new Score(v);
}

Student::~Student() {
  delete score_;
}

void Student::set_score(const std::string &name, float score) {
  this->score_->set_score(name, score);
}

float Student::score(const std::string &name) {
  return this->score_->score(name);
}

Student::Score::Score(const std::vector<std::string> &v) {
  for (auto i : v)
    scores_[i] = 0;
}

void Student::Score::set_score(const std::string &name, float score) {
  scores_[name] = score;
}

float Student::Score::score(const std::string &name) {
  return scores_[name];
}

float Student::Score::AverageScore(const std::vector<std::string> &v) {
  float sum = 0;
  for (auto i:v)
    sum += scores_[i];
  return sum / v.size();
}
