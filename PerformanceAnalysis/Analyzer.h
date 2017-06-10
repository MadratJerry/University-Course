/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#ifndef DATASTRUCTURELAB_ANALYZER_H
#define DATASTRUCTURELAB_ANALYZER_H

#include "Student.h"
#include <string>
#include <vector>

class Analyzer {
 private:
  std::string input_file_name_;
  std::vector<std::string> course_names_;
  std::vector<Student *> list_;

  void LoadData();

  void StoreData();

  void StoreData(const std::string &output_file_name,
                 const std::vector<Student *> &list,
                 const std::vector<std::string> &names);

  void StoreData(const std::string &output_file_name,
                 const std::vector<Student *> &list,
                 const std::string &name);

 public:
  explicit Analyzer(const std::string &input_file_name);

  ~Analyzer();

  void Print();

  void Add();

  void SortBy(const std::string &name);

  const std::vector<std::string> &course_names() const;
};

#endif //DATASTRUCTURELAB_ANALYZER_H
