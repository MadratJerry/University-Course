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
    std::string file_name_;
    std::vector<std::string> course_names_;
    std::vector<Student *> list_;

    void LoadData();

    void StoreData();

public:
    explicit Analyzer(const std::string &file_name);

    ~Analyzer();

    void Print();

    void Add();
};


#endif //DATASTRUCTURELAB_ANALYZER_H
