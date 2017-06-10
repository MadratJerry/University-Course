/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#ifndef DATASTRUCTURELAB_STUDENT_H
#define DATASTRUCTURELAB_STUDENT_H

#include <string>
#include <vector>
#include <map>

class Student {

  class Score;

 private:
  std::string name_;
  unsigned int id_;
  Score *score_;

 public:
  Student(unsigned int id, const std::string &name, const std::vector<std::string> &v);

  ~Student();

  const std::string &name() const;

  void set_name(const std::string &name);

  unsigned int id() const;

  void set_id(unsigned int id);

  void set_score(const std::string &name, float score);

  float score(const std::string &name);

};

class Student::Score {
 private:
  std::map<std::string, float> scores_;
 public:
  Score(const std::vector<std::string> &v);

  void set_score(const std::string &name, float score);

  float score(const std::string &name);

  float AverageScore(const std::vector<std::string> &v);
};

#endif //DATASTRUCTURELAB_STUDENT_H
