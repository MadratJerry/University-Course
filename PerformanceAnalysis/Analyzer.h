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
    std::string fileName;
    std::vector<std::string> v;
    std::vector<Student *> list;

    void loadData();

    void storeData();

public:
    explicit Analyzer(const std::string &fileName);

    ~Analyzer();

    void print();

    void add();
};


#endif //DATASTRUCTURELAB_ANALYZER_H
