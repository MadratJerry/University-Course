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

public:
    explicit Analyzer(const std::string &fileName);

    ~Analyzer();

    void storeData();

    void print();
};


#endif //DATASTRUCTURELAB_ANALYZER_H
