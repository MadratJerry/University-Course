/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Student.h"

#include <iostream>

const std::string &Student::getName() const {
    return name;
}

void Student::setName(const std::string &name) {
    Student::name = name;
}

unsigned int Student::getId() const {
    return id;
}

void Student::setId(unsigned int id) {
    Student::id = id;
}

Student::Student(unsigned int id, const std::string &name, const std::vector<std::string> &v) {
    setId(id);
    setName(name);
    this->score = new Score(v);
}

Student::~Student() {
    delete score;
}

void Student::setScore(const std::string &name, float score) {
    this->score->setScore(name, score);
}

float Student::getScore(const std::string &name) {
    return this->score->getScore(name);
}

Student::Score::Score(const std::vector<std::string> &v) {
    for (auto i : v)
        m[i] = 0;
}

void Student::Score::setScore(const std::string &name, float score) {
    m[name] = score;
}

float Student::Score::getScore(const std::string &name) {
    return m[name];
}